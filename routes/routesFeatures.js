const Router = require('koa-router');

const espSendEmailAlert = require('../features/espSsrSendEmailAlert.js');

const featuresRouter = new Router({ prefix: '/feature' });

featuresRouter.all('/esp_ssr_alert_email', async (ctx) => { await espSendEmailAlert(ctx); });

exports.featuresRouter = featuresRouter;
