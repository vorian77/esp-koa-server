const Router = require('koa-router');

const { testEchoGet, testEchoPost, testHttp } = require('./routesTestsFunctions.js');

const testsRouter = new Router({ prefix: '/test' });

testsRouter.get('/echo', async (ctx) => { await testEchoGet(ctx); });
testsRouter.post('/echo', async (ctx) => { await testEchoPost(ctx); });
testsRouter.post('/http', async (ctx) => { await testHttp(ctx); });

exports.testsRouter = testsRouter;
