// processes all incoming routes to */esp/* to esp1 database web services

const Router = require('koa-router');
const { espConnect } = require('./routesEspConnect.js');

const espRouter = new Router({ prefix: '/esp' });

espRouter.all('(.*)', async (ctx) => { await espConnect(ctx); });

exports.espRouter = espRouter;