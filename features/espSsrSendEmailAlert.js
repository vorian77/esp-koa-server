// ESP Self-Service Registration - Send Email Alert

require('dotenv').config();
const http = require('../utilities/http.js');
const sendEmail = require('../utilities/msgMail.js');

// expected input parms
// ctx.query.applicantId
// ctx.query.alertType
// ctx.query.content // optional - used for message alerts

module.exports = async function(ctx) {
  await getApplicantData(ctx);
  await setEmailContent(ctx);
  await sendMsg(ctx);
}

const getApplicantData = async function(ctx) {
  method = 'get';
  const url = process.env.ESP_DB_URL + '/esp/ws_cm_ssr_email_alert_data';

  try {
    const response = await http(method, url, ctx.query);
    ctx.query.applicantName = response.data.applicant;
    ctx.query.emailToList = response.data.emailAddresses;
  } catch (err) {
    console.error(`getApplicantData error...\nURL: ${url} \nQuery Params: ${JSON.stringify(ctx.query)}`);
    const newErr = new Error(err.message);
    newErr.status = err.status;
    throw newErr;
  }
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

const sendMsg = async function(ctx) {
  const msg = {
    emailToList: ctx.query.emailToList,
    emailFrom: 'alerts@TheAppFactory.com',
    emailSubject: ctx.query.emailSubject,
    emailBody: ctx.query.emailBody
  }

  try {
    const response = await sendEmail(msg);
    ctx.body = response.body;
    ctx.status = response.status;
  } catch(err) {
    throw err;
  }
}