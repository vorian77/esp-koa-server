"use strict";

const { espConnect, http, sendEmail, sendText } = require('@vorian77/node_utilities');

module.exports.testEcho = async function (ctx) {
  console.log(`parm echo: ${JSON.stringify(ctx.query)}`);
  ctx.body = ctx.query;
}

module.exports.testEspConnect = async function (ctx) {
  const method = ctx.query.method;
  const espfunction = ctx.query.function;
  const espParms = ctx.query;
  
  try {
    const response = await espConnect(method, espfunction, espParms);
    ctx.status = response.status;
    ctx.body = response.body;
  } catch(err) {
    throw err;
  }
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
  ctx.query.To = ctx.request.body.To;
  ctx.query.SmsSid = ctx.request.body.SmsSid;
  ctx.query.ErrorCode = ctx.request.body.ErrorCode;
  ctx.query.SmsStatus = ctx.request.body.SmsStatus;
  ctx.query.MessageStatus = ctx.request.body.MessageStatus;

  try { 
    ctx.path = '/ws_sms_update'
    await espConnect(ctx);
  } catch(err) {
    throw err;
  }
}

