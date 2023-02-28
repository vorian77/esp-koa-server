const Router = require('koa-router');

const { featuresRouter } = require('./routesFeatures.js');
const { storageRouter } = require('./routesStorage.js');
const { testsRouter } = require('./routesTests.js');

const apiRouter = new Router();

apiRouter.all('/', (ctx) => { ctx.body = 'Hello from the KidSmart API-Utilities!'});

const nestedRoutes = [featuresRouter, storageRouter, testsRouter];
for (var router of nestedRoutes) {
  apiRouter.use(router.routes(), router.allowedMethods());
}

exports.apiRouter = apiRouter;