const Router = require('koa-router');

const { sendEmailAlert } = require('./routesMsgFunctions.js');

const msgRouter = new Router({ prefix: '/msg' });

msgRouter.all('/email_alert', async (ctx) => { await sendEmailAlert(ctx); });

exports.msgRouter = msgRouter;
