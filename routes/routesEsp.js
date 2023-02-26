const Router = require('koa-router');
const { espConnect } = require('@vorian77/node_utilities');

const espRouter = new Router({ prefix: '/esp' });

espRouter.all('(.*)', async (ctx) => { await esp(ctx); });

exports.espRouter = espRouter;

async function esp(ctx) {
  const method = ctx.request.method;
  const prefix = '/esp';
  const espFunction = ctx.path.slice(ctx.path.indexOf(prefix) + prefix.length + 1);
  
  const response = await espConnect(method, espFunction, ctx.query);
  ctx.status = response.status;
  ctx.body = response.body;
}
