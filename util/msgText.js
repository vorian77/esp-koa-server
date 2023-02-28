"use strict";

require('dotenv').config();
const Twilio = require('twilio');

module.exports = async function(phoneNbrTo, textBody, textMaxPrice) {  
  // environmental parms
  const accountSid = process.env.TWILIO_ACCT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const phoneNbrFrom = process.env.TWILIO_PHONE_NBR;
  const textStatusCallback = process.env.TWILIO_STATUS_CALLBACK;

  const twilio = new Twilio(accountSid, authToken);
  
  // parms
  const parms = {
    from: phoneNbrFrom,
    to: phoneNbrTo,
    body: textBody,
    MaxPrice: textMaxPrice || process.env.TWILIO_MAXPRICE,
    statusCallback: textStatusCallback
  };

  try {
    const message = await twilio.messages.create(parms);
    const bodyRtn = JSON.stringify({sid: message.sid, parms});
    return {
      status: 201, // created
      body: bodyRtn
    }
  } catch(err) {
    err.message = JSON.stringify(err);
    throw err;
  }
}
