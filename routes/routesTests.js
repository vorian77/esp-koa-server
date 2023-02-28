const Router = require('koa-router');

const { testEcho, testEspConnect, testHttp, testEmail, testText, testTextStatusCallback } = require('./routesTestsFunctions.js');

const testsRouter = new Router({ prefix: '/test' });

testsRouter.all('/echo', async (ctx) => { await testEcho(ctx); });
testsRouter.all('/email', async (ctx) => { await testEmail(ctx); });
testsRouter.all('/http', async (ctx) => { await testHttp(ctx); });
testsRouter.all('/text', async (ctx) => { await testText(ctx); });

exports.testsRouter = testsRouter;
