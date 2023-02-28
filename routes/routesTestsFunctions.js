"use strict";

const http = require('../util/http.js');
const sendEmail = require('../util/msgMail.js');
const sendText = require('../util/msgText.js');

module.exports.testEcho = async function (ctx) {
  console.log(`parm echo: ${JSON.stringify(ctx.query)}`);
  ctx.body = ctx.query;
}

module.exports.testHttp = async function (ctx) {
  const method = ctx.query.method;
  const url = ctx.query.url;

  try {
    const response = await http(method, url, ctx);
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

