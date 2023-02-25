const Router = require('koa-router');
const { espConnect } = require('./routesEspFunctions.js');

const espRouter = new Router({ prefix: '/esp' });

espRouter.all('(.*)', async (ctx) => { await espConnect(ctx); });

exports.espRouter = espRouter;