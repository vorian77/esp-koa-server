const Router = require('koa-router');

const { espRouter } = require('./routesEsp.js');
const { msgRouter } = require('./routesMsg.js');

const apiRouter = new Router({ prefix: '/api' });

const nestedRoutes = [espRouter, msgRouter];
for (var router of nestedRoutes) {
  apiRouter.use(router.routes(), router.allowedMethods());
}

exports.apiRouter = apiRouter;