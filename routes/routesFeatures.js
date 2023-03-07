const Router = require('koa-router');


const featuresRouter = new Router({ prefix: '/feature' });

//featuresRouter.all('/esp_ssr_alert_email', async (ctx) => { await espSendEmailAlert(ctx); });

exports.featuresRouter = featuresRouter;
