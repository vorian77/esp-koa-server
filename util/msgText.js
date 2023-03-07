"use strict";

require('dotenv').config();
const Twilio = require('twilio');

module.exports = async function(phoneNbrTo, textBody, textMaxPrice) {  
  const { TWILIO_ACCT_SID, 
    TWILIO_AUTH_TOKEN, 
    TWILIO_PHONE_NBR, 
    TWILIO_STATUS_CALLBACK,
    TWILIO_MAXPRICE } = process.env;
  const twilio = new Twilio(TWILIO_ACCT_SID, TWILIO_AUTH_TOKEN);
  
  // parms
  const parms = {
    from: TWILIO_PHONE_NBR,
    to: phoneNbrTo,
    body: textBody,
    MaxPrice: textMaxPrice || TWILIO_MAXPRICE,
    statusCallback: TWILIO_STATUS_CALLBACK
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
