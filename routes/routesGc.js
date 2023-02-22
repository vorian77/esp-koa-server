const Router = require('koa-router');

const { objExists, objUploadFile , objDownloadFile } = require('./routesGcObj.js');

const gcRouter = new Router({ prefix: '/GC' });

//gcRouter.all('/objDelete', async (ctx) => { await objDelete(ctx); });
//gcRouter.all('/objExists', async (ctx) => { await objExists(ctx); });
//gcRouter.all('/objResize', async (ctx) => { await objResize(ctx); });
//gcRouter.all('/objUpload', async (ctx) => { await objUpload(ctx); });
gcRouter.all('/objUploadFile', async (ctx) => { await objUploadFile(ctx); });
gcRouter.all('/objDownloadFile', async (ctx) => { await objDownloadFile(ctx); });

exports.gcRouter = gcRouter;
