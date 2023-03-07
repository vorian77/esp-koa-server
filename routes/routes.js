const Router = require('koa-router');

const { featuresRouter } = require('./routesFeatures.js');
const { msgRouter } = require('./routesMsg.js');
const { storageRouter } = require('./routesStorage.js');
const { testsRouter } = require('./routesTests.js');

const apiRouter = new Router();

const PORT = process.env.PORT;
apiRouter.all('/', (ctx) => { ctx.body = `Hello from the KidSmart API-Utilities (port: ${PORT})!`});

const nestedRoutes = [featuresRouter, msgRouter, storageRouter, testsRouter];
for (var router of nestedRoutes) {
  apiRouter.use(router.routes(), router.allowedMethods());
}

exports.apiRouter = apiRouter;