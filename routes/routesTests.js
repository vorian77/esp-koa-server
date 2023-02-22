const Router = require('koa-router');

const { echo, http_request } = require('../features/tests.js');

const testsRouter = new Router({ prefix: '/tests' });

testsRouter.all('/echo', async (ctx) => { await echo(ctx); });
testsRouter.all('/http_request', async (ctx) => { await http_request(ctx); });

exports.testsRouter = testsRouter;
