const Router = require('koa-router');

const { blobList, blobUploadText, blobUploadFilePath } = require('./routesStorageFunctions.js');

const storageRouter = new Router({ prefix: '/storage' });

storageRouter.all('/blob_list', async (ctx) => { await blobList(ctx); });
storageRouter.all('/blob_upload_text', async (ctx) => { await blobUploadText(ctx); });
storageRouter.all('/blob_upload_file_path', async (ctx) => { await blobUploadFilePath(ctx); });

exports.storageRouter = storageRouter;
