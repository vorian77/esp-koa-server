"use strict";

// ESP Self-Service Registration - Send Email Alert

require('dotenv').config();
const http = require('../util/http.js');
const sendEmail = require('../util/msgMail.js');

module.exports = async function(ctx) {
  ctx.state.applicantId = ctx.request.body.applicantId;
  ctx.state.alertType = ctx.request.body.alertType;
  ctx.state.content = ctx.request.body.content;  // optional - used for message alerts

  await getApplicantData(ctx);
  await setEmailContent(ctx);
  await sendMsg(ctx);
}

const getApplicantData = async function(ctx) {
  const url = process.env.ESP_DB_URL + '/esp/ws_cm_ssr_email_alert_data';
  const method = 'get';
  ctx.query.applicantId = ctx.state.applicantId;

  try {
    const response = await http(method, url, ctx);
    ctx.state.applicantName = response.data.applicant;
    ctx.state.emailToList = response.data.emailAddresses;
  } catch (err) {
    console.error(`getApplicantData error...\nURL: ${url} \nQuery Params: ${JSON.stringify(ctx.query)}`);
    const newErr = new Error(err.message);
    newErr.status = err.status;
    throw newErr;
  }
}

const setEmailContent = async function(ctx) {
  const applicantName = ctx.state.applicantName;
  const alertType = ctx.state.alertType;
  const content = ctx.state.content;

  // email subject
  ctx.state.emailSubject = 'KidSmart - New Self-Service App Upload - ' + alertType + ' (' + applicantName + ')';
  
  // email body
  let emailBody = '<h3>Please check CaseManager for a new self-service registration app upload:</h3>' + 
    '<p><b>Applicant:</b> ' + applicantName + '</p>' + 
    '<p><b>Upload Type:</b> ' + alertType + '</p>' ;
  if (content) { emailBody += '<p></p><p><b>Message Content: </b>' + content + '</p>' };
  emailBody = '<!DOCTYPE html> <html> <body>' +  emailBody + '</body> </html>';

  ctx.state.emailBody = emailBody;
}

const sendMsg = async function(ctx) {
  const msg = {
    emailToList: ctx.state.emailToList,
    emailFrom: 'alerts@TheAppFactory.com',
    emailSubject: ctx.state.emailSubject,
    emailBody: ctx.state.emailBody
  }

  try {
    const response = await sendEmail(msg);
    ctx.body = response.body;
    ctx.status = response.status;
  } catch(err) {
    throw err;
  }
}