const { espConnect } = require('./routesEspConnect.js');
const { sendEmail } = require('./routesMsgEmail.js');

const sendEmailAlert = async function(ctx) {
  await getApplicantData(ctx);
  await setEmailContent(ctx);
  await sendAlertEmail(ctx);
}

const getApplicantData = async function(ctx) {
  // config espConnect - query.applicantId already set
  ctx.path = '/esp/ws_cm_ssr_email_alert_data'
  await espConnect(ctx);

  // transfer response to query
  ctx.query.applicantName = ctx.body.applicant;
  ctx.query.emailToList = ctx.body.emailAddresses;
}

const setEmailContent = async function(ctx) {
  const applicantName = ctx.query.applicantName;
  const emailType = ctx.query.alertEmailType;
  ctx.query.emailSubject = 'KidSmart - New Self-Service App Upload - ' + emailType + ' (' + applicantName + ')';
  ctx.query.emailBody = '<!DOCTYPE html> <html> <body> <h3>Please check CaseManager for a new self-service registration app upload:</h3> <p><b>Upload Type:</b> ' + emailType + '</p> <p><b>Applicant:</b> ' + applicantName + '</p>' + '</p> </body> </html>';
}

const sendAlertEmail = async function(ctx) {
  await sendEmail(ctx);
}

exports.sendEmailAlert = sendEmailAlert;