const Router = require('koa-router');

const { sendEmail, sendText } = require('./routesMsgFunctions.js');
const espEmailAlert = require('./routesMsgFunctionsEspEmailAlert.js');

const msgRouter = new Router({ prefix: '/msg' });

msgRouter.all('/send_email', async (ctx) => { await sendEmail(ctx); });
msgRouter.all('/send_text', async (ctx) => { await sendText(ctx); });
msgRouter.all('/esp_email_alert', async (ctx) => { await espEmailAlert(ctx); });

exports.msgRouter = msgRouter;

