const Router = require('koa-router');

const { sendText } = require('./routesMsgText.js');
const { sendTextStatus } = require('./routesMsgTextStatus.js');
const { sendEmail } = require('./routesMsgEmail.js');
const { sendEmailAlert } = require('./routesMsgEmailCmSsrAlert.js');

const msgRouter = new Router({ prefix: '/send' });

msgRouter.all('/text', async (ctx) => { await sendText(ctx); });
msgRouter.all('/text_status', async (ctx) => { await sendTextStatus(ctx); });
msgRouter.all('/email', async (ctx) => { await sendEmail(ctx); });
msgRouter.all('/email_alert', async (ctx) => { await sendEmailAlert(ctx); });

exports.msgRouter = msgRouter;
