const _ = require('lodash');
const template = require('./template');
const settingsCache = require('../../../shared/settings-cache');
const urlUtils = require('../../../shared/url-utils');
const labs = require('../../../shared/labs');
const moment = require('moment-timezone');
const api = require('../../api').endpoints;
const apiShared = require('../../api').shared;
const {URL} = require('url');
const mobiledocLib = require('../../lib/mobiledoc');
const htmlToPlaintext = require('@tryghost/html-to-plaintext');
const membersService = require('../members');
const {isUnsplashImage, isLocalContentImage} = require('@tryghost/kg-default-cards/lib/utils');
const {textColorForBackgroundColor, darkenToContrastThreshold} = require('@tryghost/color-utils');
const logging = require('@tryghost/logging');
const urlService = require('../../services/url');
const {fillAdvertisements} = require('./advertising');

const ALLOWED_REPLACEMENTS = ['first_name'];

// Format a full html document ready for email by inlining CSS, adjusting links,
// and performing any client-specific fixes
const formatHtmlForEmail = function formatHtmlForEmail(html) {
    const juiceOptions = {inlinePseudoElements: true};

    const juice = require('juice');
    let juicedHtml = juice(html, juiceOptions);

    // convert juiced HTML to a DOM-like interface for further manipulation
    // happens after inlining of CSS so we can change element types without worrying about styling

    const cheerio = require('cheerio');
    const _cheerio = cheerio.load(juicedHtml);

    // force all links to open in new tab
    _cheerio('a').attr('target', '_blank');
    // convert figure and figcaption to div so that Outlook applies margins
    _cheerio('figure, figcaption').each((i, elem) => !!(elem.tagName = 'div'));

    juicedHtml = _cheerio.html();

    // Fix any unsupported chars in Outlook
    juicedHtml = juicedHtml.replace(/&apos;/g, '&#39;');

    return juicedHtml;
};

const getSite = () => {
    const publicSettings = settingsCache.getPublic();
    return Object.assign({}, publicSettings, {
        url: urlUtils.urlFor('home', true),
        iconUrl: publicSettings.icon ? urlUtils.urlFor('image', {image: publicSettings.icon}, true) : null
    });
};

/**
 * createUnsubscribeUrl
 *
 * Takes a member and newsletter uuid. Returns the url that should be used to unsubscribe
 * In case of no member uuid, generates the preview unsubscribe url - `?preview=1`
 *
 * @param {string} uuid post uuid
 * @param {string} newsletterUuid newsletter uuid
 */
const createUnsubscribeUrl = (uuid, newsletterUuid) => {
    const siteUrl = urlUtils.getSiteUrl();
    const unsubscribeUrl = new URL(siteUrl);
    unsubscribeUrl.pathname = `${unsubscribeUrl.pathname}/unsubscribe/`.replace('//', '/');
    if (uuid) {
        unsubscribeUrl.searchParams.set('uuid', uuid);
    } else {
        unsubscribeUrl.searchParams.set('preview', '1');
    }
    if (newsletterUuid) {
        unsubscribeUrl.searchParams.set('newsletter', newsletterUuid);
    }

    return unsubscribeUrl.href;
};

/**
 * createPostSignupUrl
 *
 * Takes a post object. Returns the url that should be used to signup from newsletter
 *
 * @param {Object} post post object
 */
const createPostSignupUrl = (post) => {
    let url = urlService.getUrlByResourceId(post.id, {absolute: true});

    // For email-only posts, use site url as base
    if (post.status !== 'published' && url.match(/\/404\//)) {
        url = urlUtils.getSiteUrl();
    }

    const signupUrl = new URL(url);
    signupUrl.hash = `/portal/signup`;

    return signupUrl.href;
};

// NOTE: serialization is needed to make sure we do post transformations such as image URL transformation from relative to absolute
const serializePostModel = async (model) => {
    // fetch mobiledoc rather than html and plaintext so we can render email-specific contents
    const frame = {options: {context: {user: true}, formats: 'mobiledoc'}};
    const docName = 'posts';

    await apiShared
        .serializers
        .handle
        .output(model, {docName: docName, method: 'read'}, api.serializers.output, frame);

    return frame.response[docName][0];
};

// removes %% wrappers from unknown replacement strings in email content
const normalizeReplacementStrings = (email) => {
    // we don't want to modify the email object in-place
    const emailContent = _.pick(email, ['html', 'plaintext']);

    const EMAIL_REPLACEMENT_REGEX = /%%(\{.*?\})%%/g;
    const REPLACEMENT_STRING_REGEX = /\{(?<recipientProperty>\w*?)(?:,? *(?:"|&quot;)(?<fallback>.*?)(?:"|&quot;))?\}/;

    ['html', 'plaintext'].forEach((format) => {
        emailContent[format] = emailContent[format].replace(EMAIL_REPLACEMENT_REGEX, (replacementMatch, replacementStr) => {
            const match = replacementStr.match(REPLACEMENT_STRING_REGEX);

            if (match) {
                const {recipientProperty} = match.groups;

                if (ALLOWED_REPLACEMENTS.includes(recipientProperty)) {
                    // keeps wrapping %% for later replacement with real data
                    return replacementMatch;
                }
            }

            // removes %% so output matches user supplied content
            return replacementStr;
        });
    });

    return emailContent;
};

/**
 * Parses email content and extracts an array of replacements with desired fallbacks
 *
 * @param {Object} email
 * @param {string} email.html
 * @param {string} email.plaintext
 *
 * @returns {Object[]} replacements
 */
const parseReplacements = (email) => {
    const EMAIL_REPLACEMENT_REGEX = /%%(\{.*?\})%%/g;
    const REPLACEMENT_STRING_REGEX = /\{(?<recipientProperty>\w*?)(?:,? *(?:"|&quot;)(?<fallback>.*?)(?:"|&quot;))?\}/;

    const replacements = [];

    ['html', 'plaintext'].forEach((format) => {
        let result;
        while ((result = EMAIL_REPLACEMENT_REGEX.exec(email[format])) !== null) {
            const [replacementMatch, replacementStr] = result;
            const match = replacementStr.match(REPLACEMENT_STRING_REGEX);

            if (match) {
                const {recipientProperty, fallback} = match.groups;

                if (ALLOWED_REPLACEMENTS.includes(recipientProperty)) {
                    const id = `replacement_${replacements.length + 1}`;

                    replacements.push({
                        format,
                        id,
                        match: replacementMatch,
                        recipientProperty: `member_${recipientProperty}`,
                        fallback
                    });
                }
            }
        }
    });

    return replacements;
};

const getTemplateSettings = async (newsletter) => {
    const accentColor = settingsCache.get('accent_color');
    const adjustedAccentColor = accentColor && darkenToContrastThreshold(accentColor, '#ffffff', 2).hex();
    const adjustedAccentContrastColor = accentColor && textColorForBackgroundColor(adjustedAccentColor).hex();

    const templateSettings = {
        headerImage: newsletter.get('header_image'),
        showHeaderIcon: newsletter.get('show_header_icon') && settingsCache.get('icon'),
        showHeaderTitle: newsletter.get('show_header_title'),
        showFeatureImage: newsletter.get('show_feature_image'),
        titleFontCategory: newsletter.get('title_font_category'),
        titleAlignment: newsletter.get('title_alignment'),
        bodyFontCategory: newsletter.get('body_font_category'),
        showBadge: newsletter.get('show_badge'),
        footerContent: newsletter.get('footer_content'),
        showHeaderName: newsletter.get('show_header_name'),
        accentColor,
        adjustedAccentColor,
        adjustedAccentContrastColor
    };

    if (templateSettings.headerImage) {
        if (isUnsplashImage(templateSettings.headerImage)) {
            // Unsplash images have a minimum size so assuming 1200px is safe
            const unsplashUrl = new URL(templateSettings.headerImage);
            unsplashUrl.searchParams.set('w', '1200');

            templateSettings.headerImage = unsplashUrl.href;
            templateSettings.headerImageWidth = 600;
        } else {
            const {imageSize} = require('../../lib/image');
            try {
                const size = await imageSize.getImageSizeFromUrl(templateSettings.headerImage);

                if (size.width >= 600) {
                    // keep original image, just set a fixed width
                    templateSettings.headerImageWidth = 600;
                }

                if (isLocalContentImage(templateSettings.headerImage, urlUtils.getSiteUrl())) {
                    // we can safely request a 1200px image - Ghost will serve the original if it's smaller
                    templateSettings.headerImage = templateSettings.headerImage.replace(/\/content\/images\//, '/content/images/size/w1200/');
                }
            } catch (err) {
                // log and proceed. Using original header image without fixed width isn't fatal.
                logging.error(err);
            }
        }
    }

    return templateSettings;
};

const serialize = async (postModel, newsletter, options = {isBrowserPreview: false}) => {
    const post = await serializePostModel(postModel);

    const timezone = settingsCache.get('timezone');
    const momentDate = post.published_at ? moment(post.published_at) : moment();
    post.published_at = momentDate.tz(timezone).format('DD MMM YYYY');

    post.authors = post.authors && post.authors.map(author => author.name).join(', ');
    if (post.posts_meta) {
        post.email_subject = post.posts_meta.email_subject;
    }

    // we use post.excerpt as a hidden piece of text that is picked up by some email
    // clients as a "preview" when listing emails. Our current plaintext/excerpt
    // generation outputs links as "Link [https://url/]" which isn't desired in the preview
    if (!post.custom_excerpt && post.excerpt) {
        post.excerpt = post.excerpt.replace(/\s\[http(.*?)\]/g, '');
    }

    post.html = mobiledocLib.mobiledocHtmlRenderer.render(
        JSON.parse(post.mobiledoc), {target: 'email', postUrl: post.url}
    );

    // perform any email specific adjustments to the mobiledoc->HTML render output
    // body wrapper is required so we can get proper top-level selections
    const cheerio = require('cheerio');
    let _cheerio = cheerio.load(`<body>${post.html}</body>`);
    // remove leading/trailing HRs
    _cheerio(`
        body > hr:first-child,
        body > hr:last-child,
        body > div:first-child > hr:first-child,
        body > div:last-child > hr:last-child
    `).remove();
    post.html = _cheerio('body').html();

    post.plaintext = htmlToPlaintext.email(post.html);

    // Outlook will render feature images at full-size breaking the layout.
    // Content images fix this by rendering max 600px images - do the same for feature image here
    if (post.feature_image) {
        if (isUnsplashImage(post.feature_image)) {
            // Unsplash images have a minimum size so assuming 1200px is safe
            const unsplashUrl = new URL(post.feature_image);
            unsplashUrl.searchParams.set('w', '1200');

            post.feature_image = unsplashUrl.href;
            post.feature_image_width = 600;
        } else {
            const {imageSize} = require('../../lib/image');
            try {
                const size = await imageSize.getImageSizeFromUrl(post.feature_image);

                if (size.width >= 600) {
                    // keep original image, just set a fixed width
                    post.feature_image_width = 600;
                }

                if (isLocalContentImage(post.feature_image, urlUtils.getSiteUrl())) {
                    // we can safely request a 1200px image - Ghost will serve the original if it's smaller
                    post.feature_image = post.feature_image.replace(/\/content\/images\//, '/content/images/size/w1200/');
                }
            } catch (err) {
                // log and proceed. Using original feature_image without fixed width isn't fatal.
                logging.error(err);
            }
        }
    }

    const templateSettings = await getTemplateSettings(newsletter);

    const render = template;

    let htmlTemplate = render({post, site: getSite(), templateSettings, newsletter: newsletter.toJSON()});

    if (options.isBrowserPreview) {
        const previewUnsubscribeUrl = createUnsubscribeUrl(null);
        htmlTemplate = htmlTemplate.replace('%recipient.unsubscribe_url%', previewUnsubscribeUrl);
        htmlTemplate = htmlTemplate.replace(/%recipient.free_block_start%/g, '');
        htmlTemplate = htmlTemplate.replace(/%recipient.free_block_end%/g, '');
        htmlTemplate = htmlTemplate.replace(/%recipient.paid_block_start%/g, '<!--');
        htmlTemplate = htmlTemplate.replace(/%recipient.paid_block_end%/g, '-->');
    }

    // @HACK: The Atlantic inserts ads
    htmlTemplate = await fillAdvertisements({
        site: getSite(),
        html: htmlTemplate
    });

    // Clean up any unknown replacements strings to get our final content
    const {html, plaintext} = normalizeReplacementStrings({
        html: formatHtmlForEmail(htmlTemplate),
        plaintext: post.plaintext
    });
    const data = {
        subject: post.email_subject || post.title,
        html,
        plaintext
    };
    if (labs.isSet('newsletterPaywall')) {
        data.post = post;
    }
    return data;
};

/**
 * renderPaywallCTA
 *
 * outputs html for rendering paywall CTA in newsletter
 */

function renderPaywallCTA() {
    const siteTitle = settingsCache.get('title') || 'Ghost';
    const siteUrl = urlUtils.getSiteUrl();
    const parsedUrl = new URL(siteUrl);
    const siteSlug = parsedUrl.pathname.split('/')[1];
    const ctaUrl = `https://accounts.theatlantic.com/products/?referral=${siteSlug}&source=${siteSlug}`;

    return `<div class="align-center" style="text-align: center;">
    <hr
        style="position: relative; display: block; width: 100%; margin: 36px 0 0;padding: 0; height: 1px; border: 0; border-top: 1px solid #D3DCE6;">
    <h2
        style="margin-top: 62px; margin-bottom: 0; font-weight: 400; font-size: 32px; line-height: 40px;text-align: center;color: #21272C;font-family: 'Adobe Garamond Pro', Times New Roman, serif;">
        Keep reading with a free trial.
    </h2>
    <p style="margin: 16px 24px 0 24px;font-style: normal;font-weight: 400;font-size: 19px;line-height: 28px;font-family: 'Adobe Garamond Pro', Times New Roman, serif;">
        This is a subscriber-only edition of ${siteTitle}. To read it in full, start your 30-day trial to The Atlantic.
    </p>
    <div style="margin: 36px 0 24px 0;text-align: center;">
        <a target="_blank" href="${ctaUrl}"
            style="padding: 15px 24px;background: #21272C;border-radius: 4px;font-family: 'Arial', sans-serif;font-style: normal;
                font-weight: 400;font-size: 16px;line-height: 48px;text-align: center;color: #FFFFFF;height: 48px;text-decoration: none;"
        >
            Get Started
        </a>
    </div>
</div>`;
}

function renderEmailForSegment(email, memberSegment) {
    const cheerio = require('cheerio');

    const result = {...email};

    /** Checks and hides content for newsletter behind paywall card
     *  based on member's status and post access
     *  Adds CTA in case content is hidden.
    */
    if (labs.isSet('newsletterPaywall')) {
        const paywallIndex = (result.html || '').indexOf('<!--members-only-->');
        if (paywallIndex !== -1 && memberSegment && result.post) {
            let statusFilter = memberSegment === 'status:free' ? {status: 'free'} : {status: 'paid'};
            const postVisiblity = result.post.visibility;

            // For newsletter paywall, specific tiers visibility is considered on par to paid tiers
            result.post.visibility = postVisiblity === 'tiers' ? 'paid' : postVisiblity;

            const memberHasAccess = membersService.contentGating.checkPostAccess(result.post, statusFilter);

            if (!memberHasAccess) {
                const postContentEndIdx = result.html.search(/[\s\n\r]+?<!-- POST CONTENT END -->/);
                result.html = result.html.slice(0, paywallIndex) + renderPaywallCTA(result.post) + result.html.slice(postContentEndIdx);
                result.plaintext = htmlToPlaintext.excerpt(result.html);
            }
        }
    }

    const $ = cheerio.load(result.html);

    $('[data-gh-segment]').get().forEach((node) => {
        if (node.attribs['data-gh-segment'] !== memberSegment) { //TODO: replace with NQL interpretation
            $(node).remove();
        } else {
            // Getting rid of the attribute for a cleaner html output
            $(node).removeAttr('data-gh-segment');
        }
    });

    result.html = formatHtmlForEmail($.html());
    result.plaintext = htmlToPlaintext.email(result.html);
    delete result.post;

    return result;
}

module.exports = {
    serialize,
    createUnsubscribeUrl,
    createPostSignupUrl,
    renderEmailForSegment,
    parseReplacements,
    // Export for tests
    _getTemplateSettings: getTemplateSettings
};
