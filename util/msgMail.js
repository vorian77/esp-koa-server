"use strict";

require('dotenv').config();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = async function (msg) {
  const functionNameError = 'sendEmail';

  try {
    const parms = {
      to: msg.emailToList.split(','),
      from: msg.emailFrom,
      subject: msg.emailSubject,
      html: msg.emailBody
    };

    console.log(`${functionNameError}.sendGrid.parms...`, parms);
    const response = await sgMail.send(parms);
    console.log(`${functionNameError}.sendGrid.successful.`);
    return {
      body: JSON.stringify(response[0].headers),
      status: response[0].statusCode
    }
  } catch(err) {
    console.error(`${functionNameError}.sendGrid.error...`)
    const newErr = new Error(JSON.stringify(err.message));
    newErr.status = err.code || 500;
    throw newErr;
  }
}
