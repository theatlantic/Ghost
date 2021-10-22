module.exports = ({siteTitle, email, url, accentColor = '#15212A', siteDomain, siteUrl}) => `
<!doctype html>
<html>
<head>
    <meta name="viewport" content="width=device-width">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>📫 Confirm your subscription to ${siteTitle}</title>
    <style>
        /* -------------------------------------
            RESPONSIVE AND MOBILE FRIENDLY STYLES
        ------------------------------------- */
        @media only screen and (max-width: 620px) {
            table[class=body] h1 {
                font-size: 28px !important;
                margin-bottom: 10px !important;
            }
            table[class=body] p,
            table[class=body] ul,
            table[class=body] ol,
            table[class=body] td,
            table[class=body] span,
            table[class=body] a {
                font-size: 16px !important;
            }
            table[class=body] .wrapper,
            table[class=body] .article {
                padding: 10px !important;
            }
            table[class=body] .content {
                padding: 0 !important;
            }
            table[class=body] .container {
                padding: 0 !important;
                width: 100% !important;
            }
            table[class=body] .main {
                border-left-width: 0 !important;
                border-radius: 0 !important;
                border-right-width: 0 !important;
            }
            table[class=body] .btn table {
                width: 100% !important;
            }
            table[class=body] .btn a {
                width: 100% !important;
            }
            table[class=body] .img-responsive {
                height: auto !important;
                max-width: 100% !important;
                width: auto !important;
            }
            table[class=body] p[class=small],
            table[class=body] a[class=small] {
                font-size: 11px !important;
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
            .recipient-link a {
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
        }
        hr {
            border-width: 0;
            height: 0;
            margin-top: 34px;
            margin-bottom: 34px;
            border-bottom-width: 1px;
            border-bottom-color: #EEF5F8;
        }
        a {
            color: #3A464C;
        }
    </style>
    <style type="text/css">
        @font-face {
            font-display: swap;
            font-family: "Adobe Garamond Pro";
            font-style: normal;
            font-weight: 400;
            src: url("https://newsletters.theatlantic.com/stlawrenceriver/ghost/assets/fonts/garamond/AGaramondPro-Regular.woff2?v=2") format("woff");
            mso-font-alt: "Georgia";
        }
        ​
        @font-face {
            font-display: swap;
            font-family: "Adobe Garamond Pro";
            font-style: normal;
            font-weight: 600;
            src: url("https://newsletters.theatlantic.com/stlawrenceriver/fonts/garamond/AGaramondPro-Semibold.woff2") format("woff");
            mso-font-alt: "Georgia";
        }
        ​
        @font-face {
            font-display: swap;
            font-family: "Adobe Garamond Pro";
            font-stretch: normal;
            font-style: normal;
            font-weight: 700;
            src: url("https://newsletters.theatlantic.com/stlawrenceriver/ghost/assets/fonts/garamond/AGaramondPro-Bold.woff2") format("woff");
            mso-font-alt: "Georgia";
        }
    </style>
</head>
<body class="" style="background-color: #FFFFFF; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
<table border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background-color: #FFFFFF;">
    <tr>
        <td colspan="3" style="text-align: center; padding-bottom: 0; padding-top: 32px;">
            <img src="https://newsletters.theatlantic.com/stlawrenceriver/ghost/assets/img/email/atlantic-logo.png" border="0" width="129" height="20" title="Atlantic" alt="Atlantic" />
        </td>
    </tr>
    <tr>
        <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 14px; vertical-align: top;">&nbsp;</td>
        <td class="container" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 14px; vertical-align: top; display: block; Margin: 0 auto; max-width: 540px; padding: 10px; width: 540px;">
            <div class="content" style="box-sizing: border-box; display: block; Margin: 0 auto; max-width: 600px; padding: 30px 20px;">

                <!-- START CENTERED WHITE CONTAINER -->
                <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">You're one tap away from subscribing to ${siteTitle}!</span>
                <table class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; background: #ffffff; border-radius: 8px;">

                    <!-- START MAIN CONTENT AREA -->
                    <tr>
                        <td class="wrapper" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 14px; vertical-align: top; box-sizing: border-box;">
                            <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;">
                                <tr>
                                    <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 14px; vertical-align: top;">
                                        <p style="font-family: Adobe Garamond Pro, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 24px; color: #15212A; font-weight: bold; line-height: 25px; margin: 0; margin-bottom: 15px;">
                                            Please confirm your email subscription.
                                        </p>
                                        <p style="font-family: Adobe Garamond Pro, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 16px; color: #3A464C; font-weight: normal; margin: 0; line-height: 25px; margin-bottom: 32px;">
                                            Thank you for signing up! We need to make sure you want to receive emails from us.
                                        </p>
                                        <p style="font-family: Adobe Garamond Pro, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 16px; color: #3A464C; font-weight: normal; margin: 0; line-height: 25px; margin-bottom: 32px;">
                                            Please verify your email below to join my email list now.
                                        </p>
                                        <table border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%; box-sizing: border-box;">
                                            <tbody>
                                            <tr>
                                                <td align="center" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 16px; vertical-align: top; padding-bottom: 35px;">
                                                    <table border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                                        <tbody>
                                                        <tr>
                                                            <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 16px; vertical-align: top; background-color: ${accentColor}; border-radius: 5px; text-align: center;"> <a href="${url}" target="_blank" style="display: inline-block; color: #ffffff; background-color: ${accentColor}; border: solid 1px ${accentColor}; border-radius: 5px; box-sizing: border-box; cursor: pointer; text-decoration: none; font-size: 16px; font-weight: normal; margin: 0; padding: 9px 22px 10px; border-color: ${accentColor};">
                                                                Verify my email
                                                            </a> </td>
                                                        </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                        <p style="font-family: Adobe Garamond Pro, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 16px; color: #3A464C; font-weight: normal; margin: 0; line-height: 25px; margin-bottom: 25px;">For your security, the link will expire in 24 hours time.</p>
                                        <hr/>
                                        <p style="word-break: break-all; font-family: Adobe Garamond Pro, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 15px; color: #3A464C; font-weight: normal; margin: 0; line-height: 25px; margin-bottom: 5px;">You can also copy & paste this URL into your browser:</p>
                                        <p style="word-break: break-all; font-family: Adobe Garamond Pro, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 15px; line-height: 25px; margin-top: 0; color: #3A464C;">${url}</p>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>

                    <!-- START FOOTER -->

                    <tr>
                        <td class="wrapper" align="center">
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-top: 20px; padding-bottom: 30px; border-top: 1px solid #D3DCE6;">
                                <tr>
                                    <td style="font-family: Arial, sans-serif;font-style: normal;font-weight: normal;font-size: 12px;line-height: 150%;text-align: center;text-transform: uppercase; color: #5E6A74;padding-top: 10px;">Share The Atlantic Newsletter:</td>
                                </tr>
                                <tr>
                                    <td style="font-family: Arial, sans-serif;font-style: normal;font-weight: normal;font-size: 12px;line-height: 150%;text-align: center;color: #5E6A74; padding-bottom: 13px;padding-top: 16px;padding-bottom: 16px;">
                                        <a href="https://facebook.org/"><img src="https://newsletters.theatlantic.com/stlawrenceriver/ghost/assets/img/email/icon-facebook.png" border="0" width="16" height="16" style="padding-left: 8px;padding-right: 8px;" alt="Facebook"></a>
                                        <a href="https://twitter.com/"><img src="https://newsletters.theatlantic.com/stlawrenceriver/ghost/assets/img/email/icon-twitter.png" border="0" width="16" height="16" style="padding-left: 8px;padding-right: 8px;" alt="Twitter"></a>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="font-family: Arial, sans-serif;font-style: normal;font-weight: normal;font-size: 12px;line-height: 150%;text-align: center;color: #5E6A74; padding-bottom: 13px;">600 New Hampshire Avenue NW ∙ Washington, DC 20037</td>
                                </tr>
                                <tr>
                                    <td style="font-family: Arial, sans-serif;font-style: normal;font-weight: normal;font-size: 12px;line-height: 150%;text-align: center;color: #5E6A74; padding-bottom: 13px;">
                                        <a href="#">Subscribe to The Atlantic</a>  |
                                        <a href="#">Get The Atlantic’s iOS app</a>
                                    </td>
                                </tr>

                                <tr>
                                    <td style="font-family: Arial, sans-serif;font-style: normal;font-weight: normal;font-size: 12px;line-height: 150%;text-align: center;color: #5E6A74; padding-bottom: 13px;">
                                        <a href="#">See all of our newsletters</a>  |
                                        <a href="#">Privacy Policy</a>  |
                                        <a href="#">Customer Care</a>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>


                    <!-- END FOOTER -->

                    <!-- END MAIN CONTENT AREA -->
                </table>

                <!-- END CENTERED WHITE CONTAINER -->
            </div>
        </td>
        <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'; font-size: 14px; vertical-align: top;">&nbsp;</td>
    </tr>
</table>
</body>
</html>
`;
