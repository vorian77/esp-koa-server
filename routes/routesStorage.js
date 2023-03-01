const Router = require('koa-router');

const { blobDelete, blobList, blobUploadText, blobUploadFilePath } = require('./routesStorageFunctions.js');

const storageRouter = new Router({ prefix: '/storage' });

storageRouter.all('/blob_delete', async (ctx) => { await blobDelete(ctx); });
storageRouter.all('/blob_list', async (ctx) => { await blobList(ctx); });
storageRouter.all('/blob_upload_text', async (ctx) => { await blobUploadText(ctx); });
storageRouter.all('/blob_upload_file_path', async (ctx) => { await blobUploadFilePath(ctx); });
storageRouter.all('/test', async (ctx) => { await test(ctx); });

exports.storageRouter = storageRouter;


async function test(ctx) {
  require("dotenv").config();
  const { BlobServiceClient } = require("@azure/storage-blob");
  const { DefaultAzureCredential } = require('@azure/identity');

  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

  const cred = new DefaultAzureCredential();

  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    new DefaultAzureCredential()
  );

  const containerClient = blobServiceClient.getContainerClient(containerName);

  // List the blob(s) in the container.
  for await (const blob of containerClient.listBlobsFlat()) {
    // Get Blob Client from name, to get the URL
    const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);
  
    console.log('Listing blobs...');
    // Display blob name and URL
    console.log(blob.name);
  }



  ctx.body = 'test';
};
