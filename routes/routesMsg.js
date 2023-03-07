const Router = require('koa-router');

const { sendEmail, sendText } = require('./routesMsgFunctions.js');
const espEmailAlert = require('./routesMsgFunctionsEspEmailAlert.js');

const msgRouter = new Router({ prefix: '/msg' });

msgRouter.post('/send_email', async (ctx) => { await sendEmail(ctx); });
msgRouter.post('/send_text', async (ctx) => { await sendText(ctx); });
msgRouter.post('/esp_email_alert', async (ctx) => { await espEmailAlert(ctx); });

exports.msgRouter = msgRouter;

