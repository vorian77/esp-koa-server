const Router = require('koa-router');

const { objExists, objUpload, urlUpload } = require('./routesS3Obj.js');

const s3Router = new Router({ prefix: '/S3' });

//s3Router.all('/objDelete', async (ctx) => { await objDelete(ctx); });
//s3Router.all('/objExists', async (ctx) => { await objExists(ctx); });
//s3Router.all('/objResize', async (ctx) => { await objResize(ctx); });
//s3Router.all('/objUpload', async (ctx) => { await objUpload(ctx); });
s3Router.all('/urlUpload', async (ctx) => { await urlUpload(ctx); });

exports.s3Router = s3Router;
