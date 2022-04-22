/* eslint indent: warn, no-irregular-whitespace: warn */
const moment = require('moment');
const iff = (cond, yes, no) => (cond ? yes : no);
module.exports = ({post, site, templateSettings}) => {
    const date = new Date();
    const hasFeatureImageCaption = templateSettings.showFeatureImage && post.feature_image && post.feature_image_caption;

    // find site slug for build subscription url
    const parsedUrl = new URL(site.url);
    const siteSlug = parsedUrl.pathname.split('/')[1];

    const ctaUrl = `https://accounts.theatlantic.com/products/?referral=${siteSlug}&utm_source=${siteSlug}`;
    const encodedPageUrl = encodeURIComponent(post.url);

    const postPubDate = moment(post.published_at).format('MMMM D, YYYY');

    return `<!doctype html>
<html>

<head>
<meta name="viewport" content="width=device-width" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>${post.title}</title>
<style>
/* -------------------------------------
    GLOBAL RESETS
------------------------------------- */

/*All the styling goes here*/

img {
    border: none;
    -ms-interpolation-mode: bicubic;
    max-width: 100%;
}

body {
    background-color: #fff;
    font-family: Adobe Garamond Pro, Times New Roman, serif;
    -webkit-font-smoothing: antialiased;
    font-size: 18px;
    line-height: 1.4;
    margin: 0;
    padding: 0;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    color: #15212A;
}

table {
    border-collapse: separate;
    mso-table-lspace: 0pt;
    mso-table-rspace: 0pt;
    width: 100%;
}

table td {
    font-family: Adobe Garamond Pro, Times New Roman, serif;
    font-size: 18px;
    vertical-align: top;
    color: #15212A;
}

/* -------------------------------------
    BODY & CONTAINER
------------------------------------- */
.body {
    background-color: #fff;
    width: 100%;
}

/* Set a max-width, and make it display as block so it will automatically stretch to that width, but will also shrink down on a phone or something */
.container {
    display: block;
    margin: 0 auto !important;
    /* makes it centered */
    max-width: 600px;
}

/* This should also be a block element, so that it will fill 100% of the .container */
.content {
    box-sizing: border-box;
    display: block;
    margin: 0 auto;
    max-width: 600px;
}

/* -------------------------------------
    POST CONTENT
------------------------------------- */
hr {
    position: relative;
    display: block;
    width: 100%;
    margin: 3em 0;
    padding: 0;
    height: 1px;
    border: 0;
    border-top: 1px solid #e5eff5;
}

p,
ul,
ol,
dl,
blockquote {
    margin: 0 0 16px 0;
    line-height: 28.5px;
}

ol,
ul {
    padding-left: 1.3em;
    padding-right: 1.5em;
}

ol ol,
ul ul,
ul ol,
ol ul {
    margin: 0.5em 0 1em;
}

ul {
    list-style: disc;
}

ol {
    list-style: decimal;
}

ul,
ol {
    max-width: 100%;
}

li {
    margin: 0.5em 0;
    padding-left: 0.3em;
    line-height: 28.5px;
}

dt {
    float: left;
    margin: 0 20px 0 0;
    width: 120px;
    color: #15212A;
    font-weight: 500;
    text-align: right;
}

dd {
    margin: 0 0 5px 0;
    text-align: left;
}

blockquote {
    margin: 16px 0;
    padding: 0 16px 0 16px;
    border-left: #5E6A74 1px solid;
    font-size: 19px;
    font-weight: 500;
    line-height: 28.5px;
    letter-spacing: -0.2px;
}

blockquote p {
    margin: 16px 0;
    font-size: 19px;
}

blockquote small {
    display: inline-block;
    margin: 0.8em 0 0.8em 1.5em;
    font-size: 0.9em;
    opacity: 0.8;
}

blockquote cite {
    font-weight: bold;
}
blockquote cite a {
    font-weight: normal;
}

a {
    color: #000000;
    text-decoration: underline;
}

h1,
h2,
h3,
h4,
h5,
h6 {
    margin-top: 0;
    font-family: Adobe Garamond Pro, Times New Roman, serif;
    line-height: 1.15em;
    font-weight: 400;
    text-rendering: optimizeLegibility;
}

h1 {
    border-top: 1px solid #000000;
    font-size: 32px;
    line-height: 40px;
    padding-bottom: 24px;
    padding-top: 16px;
    margin: 0;
    font-weight: 400;
}

h1 a {
    text-decoration: none;
}

h2 {
    border-top: 1px solid #000000;
    font-size: 32px;
    line-height: 40px;
    padding-bottom: 24px;
    padding-top: 16px;
    margin: 0;
}

h3 {
    margin: 1.5em 0 0.5em 0;
    font-size: 26px;
    line-height: 1.25em;
}

h4 {
    margin: 1.8em 0 0.5em 0;
    font-size: 21px;
    line-height: 1.3em;
}

h5 {
    margin: 2em 0 0.5em 0;
    font-size: 19px;
    line-height: 1.4em;
}

h6 {
    margin: 2em 0 0.5em 0;
    font-size: 19px;
    line-height: 1.4em;
    font-weight: 700;
}

strong {
    font-weight: 700;
}

figure {
    margin: 0 0 1.5em;
    padding: 0;
}

figcaption {
    text-align: center;
    font-family: Adobe Garamond Pro, Times New Roman, serif;
    font-size: 14px;
    padding-top: 5px;
    line-height: 1.5em;
}

code {
    font-size: 0.9em;
}

pre {
    white-space: pre-wrap;
    background: #15212A;
    padding: 15px;
    border-radius: 3px;
    line-height: 1.2em;
    color: #ffffff;
}

p code {
    background: #F2F7FA;
    word-break: break-all;
    padding: 1px 7px;
    border-radius: 3px;
}

figure blockquote p {
    font-size: 1em;
}

.header-image {
    padding-top: 0;
    padding-bottom: 40px;
}

.header-image td {
    border: 0.5px solid #000000;
    height: 184px;
    vertical-align: middle;
}

.header-image .site-title {
    font-family: Adobe Garamond Pro, Times New Roman, serif;
    font-style: normal;
    font-weight: normal;
    font-size: 24px;
    line-height: 125%;
    text-align: center;
    color: #000000;
}

.header-date {
    font-family: Courier, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #5E6A74;
    padding: 16px 16px 12px;
}

.header-subscribe {
    color: #000000;
    font-family: 'Logic Monospace', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    padding: 16px 16px 12px;
    border-bottom: 0.5px solid #000000;
}

.header-info {
    font-family: Courier,sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    text-align: center;
    letter-spacing: 0.04em;
    color: #000000;
    padding-right: 20px;
    padding-left: 20px;
    padding-top: 24px;
    padding-bottom: 24px;
    background-color: #ffffff;
}

.email-content>td {
    padding-left: 20px;
    padding-right: 20px;
}

.post-content {
    font-family: Adobe Garamond Pro, Times New Roman, serif;
    font-style: normal;
    font-size: 19px;
    line-height: 150%;
    color: #000000;
    padding-bottom: 30px;
    padding-top: 24px;
}

.email-white-delimiter {
    background-color: #ffffff;
    height: 40px;
}

.site-icon {
    padding-bottom: 10px;
    padding-top: 20px;
    text-align: center;
    border-radius: 3px;
}

.site-icon img {
    width: 48px;
    height: 48px;
    border-radius: 3px;
}

.site-info {
    padding-top: 50px;
    border-bottom: 1px solid #e5eff5;
}

.site-url {
    color: #15212A;
    font-size: 16px;
    letter-spacing: -0.1px;
    font-weight: 700;
    text-transform: uppercase;
    text-align: center;
    padding-bottom: 50px;
}

.site-title {
    color: #15212A;
}

.site-sub-title {
    font-family: Adobe Garamond Pro, Times New Roman, serif;
    font-style: italic;
    font-weight: normal;
    font-size: 24px;
    line-height: 125%;
    text-align: center;
    color: #000000;
    flex: none;
    order: 1;
    align-self: stretch;
    flex-grow: 0;
    margin: 4px 0px;
}

.post-title {
    padding-top: 40px;
    padding-bottom: 0;
    font-family: Adobe Garamond Pro, Times New Roman, serif;
    font-style: normal;
    font-weight: normal;
    font-size: 32px;
    line-height: 40px;
    color: #21272C;
}

.post-title h1 {
    padding-bottom: 0;
}

.post-title div {
    border-top: 1px solid #000000;
}

.post-title-serif {
    font-family: Georgia, serif;
}
.post-title-left {
    text-align: left;
}

.post-title-link {
    color: #15212A;
    display: block;
    text-align: center;
}
.post-title-link-left {
    text-align: left;
}

.post-meta,
.view-online {
    padding-bottom: 50px;
    white-space: nowrap;
    color: #738a94;
    font-size: 13px;
    letter-spacing: 0.2px;
    text-transform: uppercase;
    text-align: center;
}
.post-meta-left {
    text-align: left;
}

.view-online {
    text-align: right;
}

.view-online-link {
    word-wrap: none;
    white-space: nowrap;
    color: #15212A;
}

.feature-image {
    padding-top: 40px;
    width: 100%;
}

.feature-image-with-caption {
    padding-bottom: 3px;
}

.feature-image-caption {
    font-family: Courier, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 18px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    color: #5E6A74;
}

.post-content-sans-serif {
    max-width: 600px !important;
    font-size: 17px;
    line-height: 1.5em;
    color: #23323D;
    padding-bottom: 20px;
    border-bottom: 1px solid #e5eff5;
}

.post-content a,
.post-content-sans-serif a {
    color: #000000;
    text-decoration: underline;
}

.kg-bookmark-card {
    width: 100%;
    background: #ffffff;
}

.kg-bookmark-card a {
    text-decoration: none;
}

.kg-card + .kg-bookmark-card {
    margin-top: 0;
}

.kg-image-card img {
    display: block;
    margin: 0 auto;
    width: auto;
    height: auto !important;
}

.kg-bookmark-container {
    display: flex;
    min-height: 148px;
    color: #15212A;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    text-decoration: none;
    border-radius: 3px;
    border: 1px solid #e5eff5;
}

.kg-bookmark-content {
    display: inline-block;
    width: 100%;
    padding: 20px;
}

.kg-bookmark-title {
    color: #15212A;
    font-size: 15px;
    line-height: 1.5em;
    font-weight: 600;
}

.kg-bookmark-description {
    display: -webkit-box;
    overflow-y: hidden;
    margin-top: 12px;
    max-height: 40px;
    color: #738a94;
    font-size: 13px;
    line-height: 1.5em;
    font-weight: 400;

    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}

.kg-bookmark-thumbnail {
    min-width: 140px;
    max-width: 180px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    border-radius: 0 2px 2px 0;
}

.kg-bookmark-thumbnail img {
    display: none;
}

.kg-bookmark-metadata {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin-top: 14px;
    color: #15212A;
    font-size: 13px;
    font-weight: 400;
}

.kg-bookmark-icon {
    margin-right: 8px;
    width: 22px;
    height: 22px;
}

.kg-bookmark-author {
    line-height: 1.5em;
}

.kg-bookmark-publisher {
    overflow: hidden;
    max-width: 240px;
    line-height: 1.5em;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.kg-bookmark-publisher:before {
    content: "•";
    margin: 0 6px;
}

.kg-gallery-container {
    margin-top: -20px;
}

.kg-gallery-image img {
    width: 100% !important;
    height: auto !important;
    padding-top: 20px;
}

.kg-video-preview {
    background-color: #1d1f21;
    background-image: radial-gradient(circle at center, #5b5f66, #1d1f21);
    display: block;
    text-decoration: none !important;
}
.kg-video-preview table {
    background-size: cover;
    min-height: 200px; /* for when images aren't loaded */
}
.kg-video-play-button {
    height: 2em;
    width: 3em;
    margin: 0 auto;
    border-radius: 10px;
    padding: 1em 0.8em 0.6em 1em;
    font-size: 1em; /* change this to resize */
    background-color: rgba(0,0,0,0.85);
}
.kg-video-play-button div {
    display: block;
    width: 0;
    height: 0;
    margin: 0 auto;
    line-height: 0px; /* fix for Yahoo Mail */
    border-color: transparent transparent transparent white;
    border-style: solid;
    border-width: 0.8em 0 0.8em 1.5em;
}


/* -------------------------------------
    HEADER, FOOTER, MAIN
------------------------------------- */
.main {
    background: #F8F7F3;
    border-radius: 3px;
    width: 100%;
}

.wrapper {
    box-sizing: border-box;
    padding: 0;
}

.content-block {
    padding-bottom: 10px;
    padding-top: 10px;
}

.footer-top {
    font-family: Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 150%;
    text-align: center;
    text-transform: uppercase;
    color: #5E6A74;
    padding-top: 10px;
}


.footer {
    font-family: Arial, sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    line-height: 150%;
    text-align: center;
    color: #5E6A74;
    padding-bottom: 12px;
}

.footer a {
    color: #5E6A74;
    text-decoration: underline;
    padding-left: 5px;
    padding-right: 5px;
}

.footer-icons {
    padding-top: 17px;
    padding-bottom: 24px;
}

.footer-icons .footer-social {
    padding-left: 8px;
    padding-right: 8px;
}

.bottom-subscribe-area {
    font-family: 'Adobe Garamond Pro', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 19px;
    line-height: 28px;
    color: #000000;
}

.bottom-subscribe-area-header {
    font-family: 'Adobe Garamond Pro', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 40px;
    color: #21272C;
    padding-bottom: 24px;
}

.bottom-subscribe-btn {
    padding: 15px 24px;
    background: #21272C;
    border-radius: 4px;
    font-family: 'Arial', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 48px;
    text-align: center;
    color: #FFFFFF;
    height: 48px;
    text-decoration: none;
}

/* -------------------------------------
    BUTTONS
------------------------------------- */
.btn {
    box-sizing: border-box;
    width: 100%;
    display: table;
}

.btn>tbody>tr>td {
    padding-bottom: 15px;
}

.btn table {
    width: auto;
}

.btn table td {
    background-color: #ffffff;
    border-radius: 5px;
    text-align: center;
}

.btn a {
    background-color: #ffffff;
    border: solid 1px #3498db;
    border-radius: 5px;
    box-sizing: border-box;
    color: #3498db;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    margin: 0;
    padding: 12px 25px;
    text-decoration: none;
    text-transform: capitalize;
}

.btn-primary table td {
    background-color: #3498db;
}

.btn-primary a {
    background-color: #3498db;
    border-color: #3498db;
    color: #ffffff;
}

.btn-accent table td {
    background-color: ${templateSettings.adjustedAccentColor || '#3498db'};
}

.btn-accent a {
    background-color: ${templateSettings.adjustedAccentColor || '#3498db'};
    border-color: ${templateSettings.adjustedAccentColor || '#3498db'};
    color: ${templateSettings.adjustedAccentContrastColor || '#ffffff'};
}

/* -------------------------------------
    OTHER STYLES THAT MIGHT BE USEFUL
------------------------------------- */
.last {
    margin-bottom: 0;
}

.first {
    margin-top: 0;
}

.align-center {
    text-align: center;
}

.align-right {
    text-align: right;
}

.align-left {
    text-align: left;
}

.clear {
    clear: both;
}

.mt0 {
    margin-top: 0;
}

.mb0 {
    margin-bottom: 0;
}

.preheader {
    color: transparent;
    display: none;
    height: 0;
    max-height: 0;
    max-width: 0;
    opacity: 0;
    overflow: hidden;
    mso-hide: all;
    visibility: hidden;
    width: 0;
}

/* -------------------------------------
    RESPONSIVE AND MOBILE FRIENDLY STYLES
------------------------------------- */
@media only screen and (max-width: 620px) {

    table.body {
        width: 100%;
        min-width: 100%;
    }

    table.body p,
    table.body ul,
    table.body ol,
    table.body td,
    table.body span {
    }

    table.body pre {
        white-space: pre-wrap !important;
        word-break: break-word !important;
    }

    table.body .wrapper,
    table.body .article {
        padding: 0 10px !important;
    }

    table.body .content {
        padding: 0 !important;
    }

    table.body .container {
        padding: 0 !important;
        width: 100% !important;
    }

    table.body .main {
        border-left-width: 0 !important;
        border-radius: 0 !important;
        border-right-width: 0 !important;
    }

    table.body .btn table {
        width: 100% !important;
    }

    table.body .btn a {
        width: 100% !important;
    }

    table.body .img-responsive {
        height: auto !important;
        max-width: 100% !important;
        width: auto !important;
    }

    table.body .site-icon img {
        width: 40px !important;
        height: 40px !important;
    }

    table.body .kg-bookmark-card {
        width: 90vw !important;
    }

    table.body .kg-bookmark-thumbnail {
        display: none !important;
    }

    table.body .kg-bookmark-metadata span {
        font-size: 13px !important;
    }

    table.body .kg-embed-card {
        max-width: 90vw !important;
    }

}

/* -------------------------------------
    PRESERVE THESE STYLES IN THE HEAD
------------------------------------- */
@media all {
    .ExternalClass {
        width: 100%;
    }

    .ExternalClass,
    .ExternalClass p,
    .ExternalClass span,
    .ExternalClass font,
    .ExternalClass td,
    .ExternalClass div {
        line-height: 100%;
    }

    .apple-link a {
        color: inherit !important;
        font-family: inherit !important;
        font-size: inherit !important;
        font-weight: inherit !important;
        line-height: inherit !important;
        text-decoration: none !important;
    }

    #MessageViewBody a {
        color: inherit;
        text-decoration: none;
        font-size: inherit;
        font-family: inherit;
        font-weight: inherit;
        line-height: inherit;
    }

    .btn-primary table td:hover {
        background-color: #34495e !important;
    }

    .btn-primary a:hover {
        background-color: #34495e !important;
        border-color: #34495e !important;
    }
}

/* ----- ENDIF THE BROWSER ----- */

</style>
<style type="text/css">
        @font-face {
            font-display: swap;
            font-family: "Adobe Garamond Pro";
            font-style: normal;
            font-weight: 400;
            src: url("https://assets.outpostpublishingcoop.com/assets/fonts/garamond/AGaramondPro-Regular.woff2?v=2") format("woff");
            mso-font-alt: "Georgia";
        }
        ​
        @font-face {
            font-display: swap;
            font-family: "Adobe Garamond Pro";
            font-style: normal;
            font-weight: 600;
            src: url("https://assets.outpostpublishingcoop.com/assets/fonts/garamond/AGaramondPro-Semibold.woff2") format("woff");
            mso-font-alt: "Georgia";
        }
        ​
        @font-face {
            font-display: swap;
            font-family: "Adobe Garamond Pro";
            font-stretch: normal;
            font-style: normal;
            font-weight: 700;
            src: url("https://assets.outpostpublishingcoop.com/assets/fonts/garamond/AGaramondPro-Bold.woff2") format("woff");
            mso-font-alt: "Georgia";
        }
        @font-face {
            font-display: swap;
            font-family: "Logic Monospace";
            font-stretch: normal;
            font-style: normal;
            font-weight: 400;
            src: url("https://assets.outpostpublishingcoop.com/assets/fonts/logic/LogicMonospace-Regular.woff2") format("woff");
        }
</style>
</head>

<body class="">
    <span class="preheader">${ post.excerpt ? post.excerpt : `${post.title} – ` }</span>
    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" width="100%">

        <!-- Outlook doesn't respect max-width so we need an extra centered table -->
        <!--[if mso]>
        <tr>
            <td>
                <center>
                    <table border="0" cellpadding="0" cellspacing="0" width="600">
        <![endif]-->

        <tr>
            <td>&nbsp;</td>
            <td class="container">
                <div class="content">

                    <!-- START CENTERED WHITE CONTAINER -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="main" width="100%">
                        ${ post.email_only === false ? `
                        <tr>
                            <td style="padding: 12px; background-color: white; text-align: center; line-height: 18px;">
                                <a style="font-family: Arial, sans-serif; font-style: normal; font-weight: normal; font-size: 12px;" href="${post.url}">
                                View and share the web version
                                </a>
                            </td>
                        </tr>
                        ` : ''}

                        <!-- START MAIN CONTENT AREA -->
                        <tr>
                            <td class="wrapper">
                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border: 0.5px solid #000000;">

                                    <tr class="email-content">
                                        <td class="header-subscribe" width="100%" align="center">
                                            <div>
                                                <svg style="vertical-align:middle; display: inline-block" width="30" height="12" viewBox="0 0 30 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M17.375 6C17.375 6 13.5974 12 8.9375 12C4.2776 12 0.5 6 0.5 6C0.5 6 4.2776 0 8.9375 0C13.5974 0 17.375 6 17.375 6Z" fill="white"></path>
                                                <path d="M10.8125 6C10.8125 7.10457 9.97303 8 8.9375 8C7.90197 8 7.0625 7.10457 7.0625 6C7.0625 4.89543 7.90197 4 8.9375 4C9.97303 4 10.8125 4.89543 10.8125 6Z" fill="black"></path>
                                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.9375 12C4.2776 12 0.5 6 0.5 6C0.5 6 4.2776 0 8.9375 0C12.3898 0 15.3578 3.29316 16.6643 5H24.8656V4.99998H26.7406V5H28.625H30.5V7V11H28.625V7H26.7418L26.7429 9.00002H24.8679L24.8668 7H16.6643C15.3578 8.70684 12.3898 12 8.9375 12ZM4.24151 7.52886C3.69684 6.99379 3.23175 6.45472 2.86986 6C3.23175 5.54528 3.69684 5.00621 4.24151 4.47114C5.66765 3.07011 7.32983 2 8.9375 2C10.5452 2 12.2074 3.07011 13.6335 4.47114C14.1782 5.00621 14.6433 5.54528 15.0051 6C14.6433 6.45472 14.1782 6.99379 13.6335 7.52886C12.2074 8.92989 10.5452 10 8.9375 10C7.32983 10 5.66765 8.92989 4.24151 7.52886Z" fill="black"></path>
                                                </svg>
                                                <div style="margin-left: 3px;display: inline-block;">
                                                  subscriber newsletter
                                                </div>
                                              </div>
                                        </td>
                                    </tr>

                                    <tr class="email-content">
                                        <td class="header-date" width="100%" align="center">
                                            ${postPubDate} <!-- ATLANTIC_PRESENTED_BY -->
                                        </td>
                                    </tr>

                                    ${ templateSettings.headerImage ? `
                                    <tr class="email-content">
                                        <td class="header-image" width="100%" align="center">
                                            <a href="${site.url}">
                                                <img src="${templateSettings.headerImage}"${templateSettings.headerImageWidth ? ` width="${templateSettings.headerImageWidth}"` : ''}>
                                            </a>
                                        </td>
                                    </tr>
                                    ` : ''}
                                    <tr>
                                        <td class="header-info" width="100%" align="center">
                                            %recipient.paid_block_start%
                                            As a subscriber to <i>The Atlantic</i>, you have access to all editions of
                                            this newsletter, including subscriber-only exclusives.
                                            Thank you for supporting my work.
                                            %recipient.paid_block_end%

                                            %recipient.free_block_start%
                                            For access to all editions of this newsletter, including subscriber-only exclusives,
                                            <a href="${ctaUrl}">subscribe to <i>The Atlantic</i></a>.
                                            %recipient.free_block_end%
                                        </td>
                                    </tr>
                                    ${ templateSettings.showFeatureImage && post.feature_image ? `
                                    <tr class="email-content">
                                        <td class="feature-image ${hasFeatureImageCaption ? 'feature-image-with-caption' : ''}"><img src="${post.feature_image}"${post.feature_image_width ? ` width="${post.feature_image_width}"` : ''}${post.feature_image_alt ? ` alt="${post.feature_image_alt}"` : ''}></td>
                                    </tr>
                                    ` : ``}
                                    ${ hasFeatureImageCaption ? `
                                    <tr class="email-content">
                                        <td class="feature-image-caption" align="left">${post.feature_image_caption}</td>
                                    </tr>
                                    ` : ``}

                                    <tr class="email-content">
                                        <td class="post-title"><h1><a class="post-title" href="${post.url}">${post.title}</a></h1></td>
                                    </tr>

                                    <tr class="email-content">
                                        <td class="post-content">
                                            <!-- POST CONTENT START -->
                                            ${post.html}
                                            <!-- ATLANTIC_BOTTOM_AD -->
                                            <!-- POST CONTENT END -->
                                        </td>
                                    </tr>

                                    <tr>
                                        <td class="wrapper" align="center" style="padding-left: 20px;padding-right: 20px;">
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
                                            style="padding-top: 32px; padding-bottom: 32px; border-top: 1px solid #D3DCE6;">
                                                <tr>
                                                    <td class="bottom-subscribe-area">
                                                        %recipient.paid_block_start%
                                                        Did someone forward you this newsletter? <a href="https://newsletters.theatlantic.com/">Sign up here</a>, and
                                                        <a href="${ctaUrl}">subscribe to <i>The Atlantic</i></a> for access to more exclusives like this.
                                                        %recipient.paid_block_end%

                                                        %recipient.free_block_start%
                                                        Did someone forward you this newsletter?
                                                        <a href="https://newsletters.theatlantic.com/">Sign up here</a>.
                                                        %recipient.free_block_end%
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                    %recipient.free_block_start%
                                    <tr>
                                        <td class="wrapper" align="center" style="padding-left: 20px;padding-right: 20px;">
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
                                            style="padding-top: 16px; border-top: 1px solid #000000;">
                                                <tr>
                                                    <td class="bottom-subscribe-area-header">Subscribe to <i>The Atlantic</i></td>
                                                </tr>
                                                <tr>
                                                    <td class="bottom-subscribe-area">
                                                    Thanks for reading! For access to all editions of this newsletter, including
                                                    subscriber-only exclusives, subscribe to <i>The Atlantic</i> today.
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style="padding-top: 40px;padding-bottom: 40px;text-align: center">
                                                        <a class="bottom-subscribe-btn" href="${ctaUrl}">Subscribe to <i>The Atlantic</i></a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    %recipient.free_block_end%

                                    <tr>
                                        <td class="wrapper" align="center" style="padding-left: 20px;padding-right: 20px;">
                                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%"
                                            style="padding-top: 20px; padding-bottom: 40px; border-top: 1px solid #D3DCE6;">
                                                <tr>
                                                    <td class="footer-top">Share This Newsletter:</td>
                                                </tr>
                                                <tr>
                                                    <td class="footer footer-icons">
                                                        <a href="https://www.facebook.com/sharer/sharer.php?u=${encodedPageUrl}"><img src="https://assets.outpostpublishingcoop.com/assets/img/email/icon-facebook.png" border="0" width="16" height="16" class="footer-social" alt="Facebook"></a>
                                                        <a href="https://twitter.com/share?url=${encodedPageUrl}"><img src="https://assets.outpostpublishingcoop.com/assets/img/email/icon-twitter.png" border="0" width="16" height="16" class="footer-social" alt="Twitter"></a>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td class="footer">600 New Hampshire Avenue NW ∙ Washington, DC 20037</td>
                                                </tr>
                                                <tr>
                                                    <td class="footer">
                                                        <a href="${ctaUrl}">Subscribe to The Atlantic</a>  |
                                                        <span style="padding-left: 5px;color: #5E6A74;">Download The Atlantic app for <a style="padding: 0;color: #5E6A74;" href="https://play.google.com/store/apps/details?id=com.theatlantic.newsstand">Android</a> and <a style="padding: 0;color: #5E6A74;" href="https://apps.apple.com/us/app/the-atlantic-magazine/id397599894">iOS</a></span>
                                                    </td>
                                                </tr>

                                                <tr>
                                                    <td class="footer">
                                                        <a href="https://www.theatlantic.com/newsletters/">See all of our newsletters</a>  |
                                                        <a href="%recipient.unsubscribe_url%">Unsubscribe</a>  |
                                                        <a href="https://www.theatlantic.com/privacy-policy/">Privacy Policy</a>  |
                                                        <a href="https://support.theatlantic.com/hc/en-us/requests/new">Customer Care</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>

                                </table>
                            </td>
                        </tr>

                        <!-- END MAIN CONTENT AREA -->

                    </table>
                    <!-- END CENTERED WHITE CONTAINER -->

                </div>
            </td>
            <td>&nbsp;</td>
        </tr>

    <!--[if mso]>
                    </table>
                </center>
            </td>
        </tr>
    <![endif]-->

    </table>
</body>

</html>`;
};
