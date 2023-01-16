const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async function(ctx) {
  const functionNameError = 'sendEmail'
  let status, body;
  
  try {
    // parms  
    const msg = {
      to: ctx.query.emailToList.split(','),
      from: 'alerts@TheAppFactory.com',
      subject: ctx.query.emailSubject,
      html: ctx.query.emailBody
    };

    // send
    try {
      const response = await sgMail.send(msg);
      ctx.body = JSON.stringify(response[0].headers);
      ctx.status = response[0].statusCode;
    } catch(err) {
      console.log(`${functionNameError}.sendGrid.error...`)
      const newErr = new Error(JSON.stringify(err.response.body.errors[0]));
      newErr.status = err.code;
      throw newErr;
    }
  } catch(err) {
    console.log(`${functionNameError}.final.error...`)
    err.status = parseInt(err.status) || 501; 
    throw err;
  }
}

exports.sendEmail = sendEmail;