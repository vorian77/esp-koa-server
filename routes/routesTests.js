const Router = require('koa-router');

const { testEcho, testHttp } = require('./routesTestsFunctions.js');

const testsRouter = new Router({ prefix: '/test' });

testsRouter.all('/echo', async (ctx) => { await testEcho(ctx); });
testsRouter.all('/http', async (ctx) => { await testHttp(ctx); });

exports.testsRouter = testsRouter;
