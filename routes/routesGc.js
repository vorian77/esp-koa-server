const Router = require('koa-router');

const { objExists, objUploadFile , objDownloadFile, test_echo, test_axios } = require('./routesGcObj.js');

const gcRouter = new Router({ prefix: '/GC' });

//gcRouter.all('/objDelete', async (ctx) => { await objDelete(ctx); });
//gcRouter.all('/objExists', async (ctx) => { await objExists(ctx); });
//gcRouter.all('/objResize', async (ctx) => { await objResize(ctx); });
//gcRouter.all('/objUpload', async (ctx) => { await objUpload(ctx); });
gcRouter.all('/objUploadFile', async (ctx) => { await objUploadFile(ctx); });
gcRouter.all('/objDownloadFile', async (ctx) => { await objDownloadFile(ctx); });

gcRouter.all('/test_echo', async (ctx) => { await test_echo(ctx); });
gcRouter.all('/test_axios', async (ctx) => { await test_axios(ctx); });

exports.gcRouter = gcRouter;
