"use strict";

const { http } = require('@vorian77/node_utilities');
const espConnect = require('../utilities/espConnect.js');
const sendEmail = require('../utilities/msgMail.js');
const sendText = require('../utilities/msgText.js');

module.exports.testEcho = async function (ctx) {
  console.log(`parm echo: ${JSON.stringify(ctx.query)}`);
  ctx.body = ctx.query;
}

module.exports.testEspConnect = async function (ctx) {
  const method = ctx.query.method;
  const espFunction = ctx.query.function;
  const espParms = ctx.query;
  await espConnect (ctx, method, espFunction, espParms);
}

module.exports.testHttp = async function (ctx) {
  const method = ctx.query.method;
  const url = ctx.query.url;

  try {
    const response = await http(method, url, ctx.query);
    ctx.body = response.statusText;
    ctx.status = response.status;
  } catch(err) {
    throw err;
  }
}

module.exports.testEmail = async function(ctx) {
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

module.exports.testText = async function(ctx) {
  const phoneNbrTo = ctx.query.phoneNbrTo;
  const body = ctx.query.body;
  const maxPrice = ctx.query.MaxPrice;
  
  try {
    const response = await sendText(phoneNbrTo, body, maxPrice);
    ctx.body = response.body;
    ctx.status = response.status;
  } catch(err) {
    throw err;
  }
}

module.exports.testTextStatusCallback = async function (ctx) {
  const method = ctx.request.method;
  const espFunction = 'ws_sms_update';
  const espParms = {
    To: ctx.request.body.To,
    SmsSid: ctx.request.body.SmsSid,
    ErrorCode: ctx.request.body.ErrorCode,
    SmsStatus: ctx.request.body.SmsStatus,
    MessageStatus: ctx.request.body.MessageStatus
  }
  await espConnect (ctx, method, espFunction, espParms);
}

