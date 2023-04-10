const nodemailer = require("nodemailer");
const path = require('path');

function sendingEmailInit() {
    return nodemailer.createTransport({
        host: "smtp-mail.outlook.com", // hostname
        secureConnection: false, // TLS requires secureConnection to be false
        port: 587, // port for secure SMTP
        tls: {
           ciphers:'SSLv3'
        },
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
          }
        });
}

exports.inviteUserEmail = async (email, username, user_id, sender_username) => {
    try {
    // create reusable transporter object using the default SMTP transport
    let transporter = sendingEmailInit();

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: process.env.EMAIL, // sender address
      to: email, // list of receivers
      subject: "Sign up invitation", // Subject line
    //text: "Hello world?", // plain text body
      html: userInvitationBody(username, user_id, sender_username) // html body
    });

    if (info.accepted.length > 0) {
        return true;
    }
    return false;
} catch(ex) {
    return new Error("couldn t send email");
}
}

exports.onUsersManagementEmail = async (receivers, actionTitle, message) => {
  try {
  // create reusable transporter object using the default SMTP transport
  let transporter = sendingEmailInit();

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: receivers, // list of receivers
    subject: "Users management", // Subject line
//      text: "Hello world?", // plain text body
    html: userManagementNotification(actionTitle, message)// html body
  });

  if (info.accepted.length > 0) {
      return true;
  }
  return false;
} catch(ex) {
  return new Error("couldn t send email");
}
}

exports.sendEmailWithAction = async (receivers, mailSubject, username, header, message, actionUrl, actionText, senderUsername) => {
  try {
  // create reusable transporter object using the default SMTP transport
  let transporter = sendingEmailInit();
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: receivers, // list of receivers
    subject: mailSubject,
    html: emailBodyWithAction(username, header, message, actionUrl, actionText, senderUsername), // html body
  });
  if (info.accepted.length > 0) {
      return true;
  }
  return false;
} catch(ex) {
  console.log(ex);
  return new Error("couldn t send email");
}
}




let userInvitationBody = (username, user_id, senderUsername) => {
  return `
  <!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
<meta charset="utf-8">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
<title>Invitation</title>
<link
href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700"
rel="stylesheet" media="screen">
<style>
.hover-underline:hover {
text-decoration: underline !important;
}

@media (max-width: 600px) {
.sm-w-full {
  width: 100% !important;
}

.sm-px-24 {
  padding-left: 24px !important;
  padding-right: 24px !important;
}

.sm-py-32 {
  padding-top: 32px !important;
  padding-bottom: 32px !important;
}

.sm-leading-32 {
  line-height: 32px !important;
}
}
</style>
</head>

<body
style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #eceff1;">
<div role="article" aria-roledescription="email" aria-label="Verify Email Address" lang="en"
style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly;">
<table style="width: 100%; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" cellpadding="0"
cellspacing="0" role="presentation">
<tr>
  <td align="center"
    style="mso-line-height-rule: exactly; background-color: #eceff1; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
    <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td class="sm-py-32 sm-px-24"
          style="mso-line-height-rule: exactly; padding: 48px; text-align: center; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
          <a href="TODO"
            style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly;">
            <img src="cid:logo" width="155" alt="logo"
              style="max-width: 100%; vertical-align: middle; line-height: 100%; border: 0;">
          </a>
        </td>
      </tr>
      <tr>
        <td align="center" class="sm-px-24"
          style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly;">
          <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td class="sm-px-24"
                style="mso-line-height-rule: exactly; border-radius: 4px; background-color: #ffffff; padding: 48px; text-align: left; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 16px; line-height: 24px; color: #626262;">
                <p
                  style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin-bottom: 0; font-size: 20px; font-weight: 600; color: #626262; margin-bottom:20px">
                  Hello <span style='font-size: 24px; font-weight: 700; color: #4e73df;'>` + username + `</span> </p>
                <p class="sm-leading-32"
                  style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 16px; font-size: 24px; font-weight: 600; color: #263238;">
                  ` + 'Sign up invitation' + `
                </p>
                <p style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; color: #626262">
                  This is an invitation to sign-up to our platform <b>THE SHELF<b><br>
                  Click the button bellow to accomplish your inscription. <br>
                </p>

                `+ `<a href="http://localhost:3000/admin/sign-up/` + user_id + `" style="display: block; margin-top: 20px; font-weight: 600; font-size: 14px; border-radius: 5px; width: fit-content; background-color: #4e73df; line-height: 100%; padding: 16px 24px; color: white; text-decoration: none;">Sign up →</a>` +
    `<table style="width: 100%">
                  <tr>
                    <td
                      style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; padding-top: 32px; padding-bottom: 32px;">
                      <div
                        style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 1px; background-color: #eceff1; line-height: 1px;">
                        &zwnj;</div>
                    </td>
                  </tr>
                </table>
                <p
                  style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 16px; color: #626262">
                  Regards, <br>
                  `
                  + senderUsername +
                  `
                </p>
              </td>
            </tr>
            <tr>
              <td style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 20px;">
              </td>
            </tr>
            <tr>
            </tr>
            <tr>
              <td style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 16px;">
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>
</table>
</div>
</body>
</html>
`
}

// email body thats going to be sent whenever a user is invited/blocked/unblocked
// to inform other responsibles
// INPUTS
// user: the user that has been blocked/unblocked/invited
// sender_username:  the lastname and firstname of the user that did the action
// actionTitle: user block/ user unblock / user invitation
// message: user block/ user unblock / user invitation
let userManagementNotification = (actionTitle, message) => {
  return `
  <!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
<meta charset="utf-8">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
<title>Invitation</title>
<link
href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700"
rel="stylesheet" media="screen">
<style>
.hover-underline:hover {
text-decoration: underline !important;
}

@media (max-width: 600px) {
.sm-w-full {
  width: 100% !important;
}

.sm-px-24 {
  padding-left: 24px !important;
  padding-right: 24px !important;
}

.sm-py-32 {
  padding-top: 32px !important;
  padding-bottom: 32px !important;
}

.sm-leading-32 {
  line-height: 32px !important;
}
}
</style>
</head>

<body
style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #eceff1;">
<div role="article" aria-roledescription="email" aria-label="Verify Email Address" lang="en"
style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly;">
<table style="width: 100%; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" cellpadding="0"
cellspacing="0" role="presentation">
<tr>
  <td align="center"
    style="mso-line-height-rule: exactly; background-color: #eceff1; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
    <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td class="sm-py-32 sm-px-24"
          style="mso-line-height-rule: exactly; padding: 48px; text-align: center; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
          <a href="TODO"
            style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly;">
            <img src="cid:logo" width="155" alt="logo"
              style="max-width: 100%; vertical-align: middle; line-height: 100%; border: 0;">
          </a>
        </td>
      </tr>
      <tr>
        <td align="center" class="sm-px-24"
          style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly;">
          <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td class="sm-px-24"
                style="mso-line-height-rule: exactly; border-radius: 4px; background-color: #ffffff; padding: 48px; text-align: left; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 16px; line-height: 24px; color: #626262;">
                <p
                  style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin-bottom: 0; font-size: 20px; font-weight: 600; color: #626262; margin-bottom:20px">
                  Hello <span style='font-size: 24px; font-weight: 700; color: #4e73df;'></span> </p>
                <p class="sm-leading-32"
                  style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 16px; font-size: 24px; font-weight: 600; color: #4e73df;">
                  ` + actionTitle + `
                </p>
                <p style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; color: #626262">
                  `
                  + message +
                  `
                </p>

                <table style="width: 100%">
                  <tr>
                    <td
                      style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; padding-top: 32px; padding-bottom: 32px;">
                      <div
                        style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 1px; background-color: #eceff1; line-height: 1px;">
                        &zwnj;</div>
                    </td>
                  </tr>
                </table>
                <p
                  style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 16px; color: #626262">
                  Regards, <br>
                  `
                  + 'The Shelf team' +
                  `
                </p>
              </td>
            </tr>
            <tr>
              <td style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 20px;">
              </td>
            </tr>
            <tr>
            </tr>
            <tr>
              <td style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 16px;">
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>
</table>
</div>
</body>
</html>
`
}



let emailBodyWithAction = (username, header, message, actionUrl, actionText, senderUsername) => {
  return `
  <!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
<meta charset="utf-8">
<meta name="x-apple-disable-message-reformatting">
<meta http-equiv="x-ua-compatible" content="ie=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
<title>Invitation</title>
<link
href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700"
rel="stylesheet" media="screen">
<style>
.hover-underline:hover {
text-decoration: underline !important;
}

@media (max-width: 600px) {
.sm-w-full {
  width: 100% !important;
}

.sm-px-24 {
  padding-left: 24px !important;
  padding-right: 24px !important;
}

.sm-py-32 {
  padding-top: 32px !important;
  padding-bottom: 32px !important;
}

.sm-leading-32 {
  line-height: 32px !important;
}
}
</style>
</head>

<body
style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #eceff1;">
<div role="article" aria-roledescription="email" aria-label="Verify Email Address" lang="en"
style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly;">
<table style="width: 100%; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" cellpadding="0"
cellspacing="0" role="presentation">
<tr>
  <td align="center"
    style="mso-line-height-rule: exactly; background-color: #eceff1; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
    <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td class="sm-py-32 sm-px-24"
          style="mso-line-height-rule: exactly; padding: 48px; text-align: center; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
          <a href="TODO"
            style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly;">
            <img src="cid:logo" width="155" alt="logo"
              style="max-width: 100%; vertical-align: middle; line-height: 100%; border: 0;">
          </a>
        </td>
      </tr>
      <tr>
        <td align="center" class="sm-px-24"
          style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly;">
          <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
              <td class="sm-px-24"
                style="mso-line-height-rule: exactly; border-radius: 4px; background-color: #ffffff; padding: 48px; text-align: left; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 16px; line-height: 24px; color: #626262;">
                <p
                  style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin-bottom: 0; font-size: 20px; font-weight: 600; color: #626262; margin-bottom:20px">
                  Hello <span style='font-size: 24px; font-weight: 700; color: #4e73df;'>` + username + `</span> </p>
                <p class="sm-leading-32"
                  style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 16px; font-size: 24px; font-weight: 600; color: #263238;">
                  ` + header + `
                </p>
                <p style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; color: #626262">
                  `
                  + message +
                  `
                </p>

                `+ `<a href="` + actionUrl + `" style="display: ` +  ((actionText == '' && actionUrl == '') ? 'none' : 'block') + `; margin-top: 20px; font-weight: 600; font-size: 14px; border-radius: 5px; width: fit-content; background-color: #4e73df; line-height: 100%; padding: 16px 24px; color: white; text-decoration: none;">` + actionText + ` →</a>` +
    `<table style="width: 100%">
                  <tr>
                    <td
                      style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; padding-top: 32px; padding-bottom: 32px;">
                      <div
                        style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 1px; background-color: #eceff1; line-height: 1px;">
                        &zwnj;</div>
                    </td>
                  </tr>
                </table>
                <p
                  style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 16px; color: #626262">
                  Regards, <br>
                  `
                  + senderUsername +
                  `
                </p>
              </td>
            </tr>
            <tr>
              <td style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 20px;">
              </td>
            </tr>
            <tr>
            </tr>
            <tr>
              <td style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 16px;">
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </td>
</tr>
</table>
</div>
</body>
</html>
`
}