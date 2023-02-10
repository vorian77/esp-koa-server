const { espConnect } = require('./routesEspConnect.js');
const { sendEmail } = require('./routesMsgEmail.js');

// expected input parms
// ctx.query.applicantId
// ctx.query.alertType

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
  const alertType = ctx.query.alertType;
  const content = ctx.query.content;

  ctx.query.emailSubject = 'KidSmart - New Self-Service App Upload - ' + alertType + ' (' + applicantName + ')';
  ctx.query.emailBody = '<h3>Please check CaseManager for a new self-service registration app upload:</h3>' + 
    '<p><b>Applicant:</b> ' + applicantName + '</p>' + 
    '<p><b>Upload Type:</b> ' + alertType + '</p>' ;
  if (content) { ctx.query.emailBody += '<p></p><p><b>Message Content: </b>' + content + '</p>' };
  ctx.query.emailBody = '<!DOCTYPE html> <html> <body>' +  ctx.query.emailBody + '</body> </html>';
}

const sendAlertEmail = async function(ctx) {
  await sendEmail(ctx);
}

exports.sendEmailAlert = sendEmailAlert;