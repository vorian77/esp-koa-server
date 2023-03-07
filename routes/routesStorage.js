const Router = require('koa-router');

const { imgDelete, imgList, imgUploadText, imgUrlDownload, imgUrlUpload, imgUpload } = require('./routesStorageFunctions.js');
const { imgProperties, imgResize } = require('./routesStorageFunctionsImage.js');

const storageRouter = new Router({ prefix: '/storage' });

storageRouter.all('/img_delete', async (ctx) => { await imgDelete(ctx); });
storageRouter.all('/img_list', async (ctx) => { await imgList(ctx); });
storageRouter.all('/img_upload_text', async (ctx) => { await imgUploadText(ctx); });
storageRouter.all('/img_url_download', async (ctx) => { await imgUrlDownload(ctx); });
storageRouter.all('/img_url_upload', async (ctx) => { await imgUrlUpload(ctx); });
storageRouter.all('/img_upload', async (ctx) => { await imgUpload(ctx); });

storageRouter.all('/img_properties', async (ctx) => { await imgProperties(ctx); });
storageRouter.all('/img_resize', async (ctx) => { await imgResize(ctx); });

exports.storageRouter = storageRouter;

