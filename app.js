"use strict";

// resources - koa
const Koa = require('koa');
const cors = require('@koa/cors');
const { koaBody } = require('koa-body');
const json = require('koa-json');

// resources - other
const fs = require('fs');
const https = require('https');
const path = require('path');
require('dotenv').config({ path: path.join(process.cwd(), '.env')});

// resources - application
const { apiRouter } = require('./routes/routes.js');
const { logger } = require('./features/logger.js');

// app
const app = new Koa();
app
  .use(handleErrors)
  .use(cors())
  .use(koaBody())
  .use(json())
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods);
   
//environment parms
const httpsKey = process.env.HTTPS_KEY
const httpsCert = process.env.HTTPS_CERT
app.context.espDbUrl = process.env.ESP_DB_URL

// certificates  
var options = {
  key: fs.readFileSync(httpsKey),
  cert: fs.readFileSync(httpsCert)
}

// listener
https
  .createServer(options, app.callback())
  .listen(3000, logStart());

function logStart() {
  const runtimeDir = process.cwd();
  const startMsg = `ESP-API started - Run time directory: ${runtimeDir}\r\n`;
  logger(startMsg);
};

// error handler for all processing within app
async function handleErrors(ctx, next) {
  try {
    await next();
  } catch (err) {
    console.log('app error...')
    ctx.status = err.status || 500;
    ctx.body = err.message;
  }
};

