// Azure

require("dotenv").config();
const { DefaultAzureCredential } = require('@azure/identity');
const { BlobServiceClient } = require("@azure/storage-blob");

// account name
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
if (!accountName) throw Error('Azure Storage accountName not found.');

// image container
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME;

// create blob service and container client
const blobServiceClient = new BlobServiceClient(
  `https://${accountName}.blob.core.windows.net`,
  new DefaultAzureCredential()
);

// create container client using blobservice
const containerClient = blobServiceClient.getContainerClient(containerName);

module.exports.blobList = async function (ctx) {
  let list =[];
    
  for await (const blob of containerClient.listBlobsFlat()) {
    // Get Blob Client from name, to get the URL
    const tempBlockBlobClient = containerClient.getBlockBlobClient(blob.name);

    // Display blob name and URL
    list.push(blob.name);
  }
  
  ctx.body = { blobs: list };
}

module.exports.blobUploadText = async function (ctx) {
  // upload blob - text
  const blobName = ctx.query.name;
  const content = ctx.query.content;
  
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
  console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

  ctx.body = { requestId: uploadBlobResponse.requestId};
}

module.exports.blobUploadText = async function (ctx) {
  // upload blob - text
  const blobName = ctx.query.name;
  const content = ctx.query.content;
  
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(content, content.length);
  console.log(`Upload block blob ${blobName} successfully`, uploadBlobResponse.requestId);

  ctx.body = { requestId: uploadBlobResponse.requestId};
}

module.exports.blobUploadFilePath = async function (ctx) {
  const blobName = ctx.query.name;
  const path = ctx.query.path;
  const uploadOptions = {};

  // create blob client from container client
  const blockBlobClient = await containerClient.getBlockBlobClient(blobName);

  // upload file to blob storage
  const uploadBlobResponse = await blockBlobClient.uploadFile(path, uploadOptions);

  ctx.body = { requestId: uploadBlobResponse.requestId};
}

module.exports.blobDelete = async function (ctx) {
  const blobName = ctx.query.name;

  // Delete the base blob and all of its snapshots.
  const options = { deleteSnapshots: 'include' };

  // Create blob client from container client
  const blockBlobClient = await containerClient.getBlockBlobClient(blobName);

  // delete blob
  const deleteBlobResponse = await blockBlobClient.deleteIfExists(options);

  console.log(`deleted blob ${blobName}`);

  //ctx.body = { requestId: uploadBlobResponse.requestId};
  ctx.body='done';
}