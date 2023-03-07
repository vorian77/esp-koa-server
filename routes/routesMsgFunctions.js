"use strict";

const sendEmail = require('../util/msgMail.js');
const sendText = require('../util/msgText.js');

module.exports.sendEmail = async function(ctx) {
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

module.exports.sendText = async function(ctx) {
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

