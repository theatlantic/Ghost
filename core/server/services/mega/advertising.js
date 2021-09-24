// Let's try to stick to existing strings in the template
const markers = {
  presentedBy: "<!-- POST CONTENT START -->",
  other: "<!-- POST CONTENT END -->",
}


const mockpresentedBy = `
  <p style="text-align:center; font-size: 14px;">
    <a href="#"
      style="color: #5e6a74; text-decoration: none;">
      Presented by Petco
    </a>
  </p>
  ${markers.presentedBy}
`

const mockSponCon = `
<table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" class="c-sponsorpromo" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; border-collapse: collapse !important;" bgcolor="#ffffff">
    <tbody>
      <tr>
        <td align="center" valign="top" class="c-sponsorpromo__container" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; padding: 16px 24px 32px 24px;" bgcolor="#ffffff">
          <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important;">
            <tbody>

              <tr>
                <td align="left" valign="top" width="100%" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <h3 class="c-sponsorpromo__advertiser" style="color: #655ade; font-family: 'Graphik', -apple-system, BlinkMacSystemFont, 'Google Sans', 'Roboto', 'Helvetica Neue', Helvetica, Segoe UI, Arial, sans-serif; font-weight: 600; font-size: 14px; line-height: 24px; letter-spacing: 0px; text-transform: uppercase; padding-top: 8px; margin: 8px 0; border-top: 4px solid #655ade;">
                    <a class="c-sponsorpromo__link" href="https://ad.doubleclick.net/ddm/clk/507046894;302742333;f" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; color: currentColor; text-decoration: none;">
                      Sponsor Content by ServiceNow
                    </a>
                  </h3>
                </td>
              </tr>



              <tr>
                <td align="left" valign="top" width="100%" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt;">
                  <h4 class="c-sponsorpromo__title" style="color: #21272c; font-family: 'Graphik', -apple-system, BlinkMacSystemFont, 'Google Sans', 'Roboto', 'Helvetica Neue', Helvetica, Segoe UI, Arial, sans-serif; font-weight: 600; font-size: 16px; line-height: 24px; margin: 0 0 8px 0;">
                    <a class="c-sponsorpromo__link" href="https://ad.doubleclick.net/ddm/clk/507046894;302742333;f" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; color: currentColor; text-decoration: none;">
                      How Do We Recover?
                    </a>
                  </h4>
                </td>
              </tr>


              <tr>
                <td align="left" valign="top" width="100%" class="c-sponsorpromo__content" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; mso-table-lspace: 0pt; mso-table-rspace: 0pt; padding-bottom: 24px;">
                  <p class="c-sponsorpromo__dek" style="color: #21272c; font-family: 'Graphik', -apple-system, BlinkMacSystemFont, 'Google Sans', 'Roboto', 'Helvetica Neue', Helvetica, Segoe UI, Arial, sans-serif; font-weight: 400; font-size: 14px; line-height: 24px; margin: 0;">
                    <a class="c-sponsorpromo__link" href="https://ad.doubleclick.net/ddm/clk/507046894;302742333;f" style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; color: currentColor; text-decoration: none;">
                      Real recovery requires more than just vaccinating the masses and distributing checks. <b style="color: #21272c; text-decoration: underline; text-decoration-color: #655ade; font-weight: normal;">Find out how digital workflows can help bring our communities relief—and ensure the holistic recovery we need.</b>&nbsp;
                    </a>
                  </p>
                </td>
              </tr>

            </tbody>
          </table>
        </td>
      </tr>
    </tbody>
  </table>

  ${markers.other}
`



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

  // @TODO maybe use url instead?
  const siteID = site.title;

  // Mocking async call that will go to API
  // Ads object will contain a placement and HTML to put there.
  const ads = await new Promise((resolve, reject) => {
    const result = {
      "presentedBy": mockpresentedBy,
      "other": mockSponCon,
    }

    setTimeout(() => {
      resolve(result);
    }, 1000);
  });

  for (let key in ads) {
    const marker = markers[key];
    html = html.replace(marker, ads[key]);
  }

  return html;
}


module.exports = {
  fillAdvertisements
}