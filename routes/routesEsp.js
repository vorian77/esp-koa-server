const Router = require('koa-router');
const { espConnect } = require('./routesEspConnect.js');

const espRouter = new Router({ prefix: '/esp' });

espRouter.all('(.*)', async (ctx) => { await espConnect(ctx); });

exports.espRouter = espRouter;