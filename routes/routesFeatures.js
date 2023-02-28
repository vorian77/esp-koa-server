const Router = require('koa-router');

const espSendEmailAlert = require('../features/espSsrSendEmailAlert.js');
const textStatusCallback = require('../features/textStatusCallback.js');

const featuresRouter = new Router({ prefix: '/feature' });

featuresRouter.all('/esp_ssr_alert_email', async (ctx) => { await espSendEmailAlert(ctx); });
featuresRouter.all('/text_status_callback', async (ctx) => { await textStatusCallback(ctx); });

exports.featuresRouter = featuresRouter;
