const Router = require('koa-router');

const { sendEmail, sendText } = require('./routesMsgFunctions.js');
const sendEmailAlertEsp = require('./routesMsgFunctionsEmailAlertEsp.js');

const msgRouter = new Router({ prefix: '/msg' });

msgRouter.post('/send_email', async (ctx) => { await sendEmail(ctx); });
msgRouter.post('/send_email_alert_esp', async (ctx) => { await sendEmailAlertEsp(ctx); });
msgRouter.post('/send_text', async (ctx) => { await sendText(ctx); });

exports.msgRouter = msgRouter;

