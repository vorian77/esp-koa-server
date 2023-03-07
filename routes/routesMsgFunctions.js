"use strict";

const sendEmail = require('../util/msgMail.js');
const sendText = require('../util/msgText.js');

module.exports.sendEmail = async function(ctx) {
  const msg = {
    emailToList: ctx.request.body.emailToList,
    emailSubject: ctx.request.body.emailSubject,
    emailBody: ctx.request.body.emailBody,
    emailFrom: 'alerts@TheAppFactory.com'
  };
  
  try {
    const response = await sendEmail(msg);
    ctx.body = response.body;
    ctx.status = response.status;
    } catch(err) {
      const newErr = new Error(err.message);
      newErr.status = err.status || 500;
      throw newErr;
    }
}

module.exports.sendText = async function(ctx) {
  const phoneNbrTo = ctx.request.body.phoneNbrTo;
  const body = ctx.request.body.body;
  const maxPrice = ctx.request.body.MaxPrice || process.env.TWILIO_MAXPRICE;
  
  try {
    const response = await sendText(phoneNbrTo, body, maxPrice);
    ctx.body = response.body;
    ctx.status = response.status;
  } catch(err) {
    throw err;
  }
}

