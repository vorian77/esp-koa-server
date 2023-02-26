const Router = require('koa-router');

const { espRouter } = require('./routesEsp.js');
const { gcRouter } = require('./routesGc.js');
const { msgRouter } = require('./routesMsg.js');
const { testsRouter } = require('./routesTests.js');

const apiRouter = new Router();

apiRouter.all('/', (ctx) => { ctx.body = 'Hello from the KidSmart ESP API (client)!'});

const nestedRoutes = [espRouter, msgRouter, gcRouter, testsRouter];
for (var router of nestedRoutes) {
  apiRouter.use(router.routes(), router.allowedMethods());
}

exports.apiRouter = apiRouter;