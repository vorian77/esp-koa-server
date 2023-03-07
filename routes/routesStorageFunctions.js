"use strict";

require("dotenv").config();
const { AWS_KEY_ACCESS, AWS_KEY_SECRET, AWS_REGION, AWS_BUCKET } = process.env;
const s3Parms = {
  credentials: {
      accessKeyId: AWS_KEY_ACCESS,
      secretAccessKey: AWS_KEY_SECRET
  },
  region: AWS_REGION,
  signatureVersion: 'v4'
};
const { S3Client } = require("@aws-sdk/client-s3");
const s3 = new S3Client(s3Parms);


module.exports.imgDelete = async function(ctx) {
  const { DeleteObjectCommand } = require("@aws-sdk/client-s3"); 
  const bucketParams = { Bucket: AWS_BUCKET, Key: ctx.query.storageKey };

  try {
    const data = await s3.send(new DeleteObjectCommand(bucketParams));
    console.log(data);
    ctx.body = { data };
  } catch (err) {
    throw err;
  }
};

module.exports.imgList = async function(ctx) {
  const { ListObjectsV2Command } = require("@aws-sdk/client-s3");
  const command = new ListObjectsV2Command({
    Bucket: AWS_BUCKET
  });

  try {
    let results = [];

    const { Contents, IsTruncated, NextContinuationToken } = await s3.send(command);
    
    let i = 0;
    while (i < Contents.length) {
      results.push(Contents[i].Key);
      i++;
    }

    console.log(results);
    ctx.body = {results};
  } catch (err) {
    throw err;
  }
}

module.exports.imgUploadText = async function(ctx) {
  const { PutObjectCommand } = require("@aws-sdk/client-s3"); 
  
  const command = new PutObjectCommand({ 
    Bucket: AWS_BUCKET, 
    Key: ctx.request.body.storageKey,
    Body: ctx.request.body.text
  });

  try {
    const response = await s3.send(command);
    console.log(response);
    ctx.body = { response };
  } catch (err) {
    throw err;
  }
};

module.exports.imgUrlDownload = async function(ctx) {
  const { storageKey } = ctx.query;
  try {
    const url = await getPresignedUrlDownload(storageKey);
    ctx.body = { url };
  } catch(err) {
    throw err;
  }
};

module.exports.imgUrlUpload = async function(ctx) {
  const { storageKey, storageContentType } = ctx.query;
  try {
    const url = await getPresignedUrlUpload(storageKey, storageContentType);
    ctx.body = { url };
  } catch(err) {
    throw err;
  }
};

module.exports.imgUpload = async function(ctx) {
  const fs = require('fs');
  const { localFileName, storageKey } = ctx.request.body;

  try {
    // get mime type
    let ext = localFileName.split('.')[1];
    if (ext == 'jpg') { ext = 'jpeg'}
    const mimeType = 'image/' + ext;

    // get url
    const url = await getPresignedUrlUpload(storageKey, mimeType);
  
     // fetch
    const response = await fetch(url, {
      method: "PUT",
      headers: { 'Content-Type': mimeType },
      body: fs.readFileSync(localFileName)
    });
    
    if (response.status >= 200 && response.status < 300) {
      ctx.status = response.status;
      ctx.body = response.statusText;
    } else {
      const err = new Error(`File upload failed...\nLocal File: ${localFileName}\nStorage Key: ${storageKey}\nPresignedURL: ${url}`)
      err.status = response.status;
      throw err;
    };
  } catch(err) {
    throw err;
  }
};

async function getPresignedUrlUpload(storageKey, storageContentType) {
  const { PutObjectCommand } = require("@aws-sdk/client-s3");
  const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");      

  const command = new PutObjectCommand({ 
    Bucket: AWS_BUCKET, 
    Key: storageKey, 
    ContentType: storageContentType 
  });

  try {
    const url  = await getSignedUrl(s3, command, { expiresIn: 3600 });
    console.log('Presigned URL: ', url );
    return url;
  } catch(err) {
    throw err;
  }
};

async function getPresignedUrlDownload(storageKey) {
  const { GetObjectCommand } = require("@aws-sdk/client-s3");
  const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
  
  try {
    const command = new GetObjectCommand({ Bucket: AWS_BUCKET, Key: storageKey });
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    console.log('Presigned URL: ', url );
    return url;
  } catch(err) {
    throw err;
  }
};
