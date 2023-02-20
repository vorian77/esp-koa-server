const {Storage} = require('@google-cloud/storage');
const fs = require('fs');
const axios = require('axios'); 

const storage = new Storage();
const bucketName = process.env.GCS_BUCKET;

// // functions
// async function objExists(ctx) {
//   console.log('inside: objExists...')
//   //const prefix = '/esp';
//   //ctx.path = ctx.path.slice(ctx.path.indexOf(prefix) + prefix.length);
// }

module.exports.objUploadFile = async function (ctx) {
  const { localFilePath, googleCloudStorageId } = ctx.query;
  
  try {
    await storage.bucket(bucketName).upload(localFilePath, { destination: googleCloudStorageId });
    const rtn = JSON.stringify({ localFilePath, googleCloudStorageId});
    console.log(`objUploadFile successful: ${rtn}`);
    ctx.body = rtn;
  } catch (err) { 
    googleError(err); 
  }
}

module.exports.objDownloadFile = async function (ctx) {
  const { localFilePath, googleCloudStorageId } = ctx.query;
  const storage = new Storage();

  try {
    await storage.bucket(bucketName).file(googleCloudStorageId).download({ destination: localFilePath });
    const rtn = JSON.stringify({ localFilePath, googleCloudStorageId});
    console.log(`objDownloadFile successful: ${rtn}`);
    ctx.body = rtn;
  } catch (err) {
    googleError(err); 
  }
}

function googleError(err) {
  if (Number.isInteger(err.code)) {
    err.status = err.code;
  } else {
    err.message = {
      code: err.code,
      errno: err.errno,
      message: err.message
    }
    err.status = 400;
  }
  throw err;
}
