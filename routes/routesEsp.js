const Router = require('koa-router');
const espConnect = require('../utilities/espConnect.js');

const espRouter = new Router({ prefix: '/esp' });

espRouter.all('(.*)', async (ctx) => { await esp(ctx); });

exports.espRouter = espRouter;

async function esp(ctx) {
  const prefix = '/esp';
  const espFunction = ctx.path.slice(ctx.path.indexOf(prefix) + prefix.length + 1);  
  await espConnect (ctx, ctx.request.method, espFunction, ctx.query);
}
