// const request = require('@tryghost/request');
const got = require('got');


// Let's try to stick to existing strings in the template
const markers = {
  presentedBy: "<!-- ATLANTIC_PRESENTED_BY -->",
  other: "<!-- ATLANTIC_BOTTOM_AD -->",
}

/**
 * The Atlantic's custom module inserting
 * ads into newsletters.
 *
 * Aim to keep the surface area of the fork entirely in this file.
 *
 * @param {Object}
 * @property {Any} site
 * @property {String} HTML
 * @returns String
 *
 */
async function fillAdvertisements({site, html}) {

  // Use the site url as the identifier for the newsletter in Hattie.
  const siteID = encodeURIComponent(site.url);

  // Allow overriding for local develment
  const hattie_api = process.env.HATTIE_API || "https://sponsor.theatlantic.com"
  const endpoint = `${hattie_api}/api/v1/newsletters/active-ads/?newsletter=${siteID}`

  // Mocking async call that will go to API
  // Ads object will contain a placement and HTML to put there.

  let ads = {};
  try {
    const {body} = await got(endpoint, {
      responseType: 'json'
    });

    ads = JSON.parse(body);
  } catch (e) {
    console.error(e)
  }

  for (let key in ads) {
    const marker = markers[key];
    const replacement = `${ads[key]}\n${marker}`;
    html = html.replace(marker, replacement);
  }

  return html;
}


module.exports = {
  fillAdvertisements
}