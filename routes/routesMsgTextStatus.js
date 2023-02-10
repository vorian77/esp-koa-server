const { espConnect } = require('./routesEspConnect.js');

const sendTextStatus = async function(ctx) {
  const functionNameError = 'sendTextStatus'
  let status, body;

  try { 
    ctx.query.To = ctx.request.body.To;
    ctx.query.SmsSid = ctx.request.body.SmsSid;
    ctx.query.ErrorCode = ctx.request.body.ErrorCode;
    ctx.query.SmsStatus = ctx.request.body.SmsStatus;
    ctx.query.MessageStatus = ctx.request.body.MessageStatus;

    // config espConnect - query.applicantId already set
    ctx.path = '/esp/ws_sms_update'
    await espConnect(ctx);
    
    } catch(err) {
      console.log(`${functionNameError}.error: ${JSON.stringify(err)}`);
      throw err;
    }
}

exports.sendTextStatus = sendTextStatus;