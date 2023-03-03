const Router = require('koa-router');

const { objDelete, objList, objUploadText, objUrlDownload, objUrlUpload } = require('./routesStorageFunctions.js');

const storageRouter = new Router({ prefix: '/storage' });

storageRouter.all('/obj_delete', async (ctx) => { await objDelete(ctx); });
storageRouter.all('/obj_list', async (ctx) => { await objList(ctx); });
storageRouter.all('/obj_upload_text', async (ctx) => { await objUploadText(ctx); });
storageRouter.all('/obj_url_download', async (ctx) => { await objUrlDownload(ctx); });
storageRouter.all('/obj_url_upload', async (ctx) => { await objUrlUpload(ctx); });

exports.storageRouter = storageRouter;

