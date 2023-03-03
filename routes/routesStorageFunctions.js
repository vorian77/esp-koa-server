// AWS-S3

require("dotenv").config();
const { AWS_KEY_ACCESS, AWS_KEY_SECRET, AWS_REGION, AWS_BUCKET } = process.env;
const s3Parms = {
  credentials: {
      accessKeyId: AWS_KEY_ACCESS,
      secretAccessKey: AWS_KEY_SECRET
  },
  region: AWS_REGION
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
    Key: ctx.query.storageKey,
    Body: ctx.query.text
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
  const { GetObjectCommand } = require("@aws-sdk/client-s3");
  const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
  const { storageKey } = ctx.query;

  const command = new GetObjectCommand({ Bucket: AWS_BUCKET, Key: storageKey });
  const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

  console.log('Presigned URL: ', url );
  ctx.body = { url } ;
};

module.exports.imgUrlUpload = async function(ctx) {
  const { PutObjectCommand } = require("@aws-sdk/client-s3");
  const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");      
  const { storageKey, contentType } = ctx.query;

  const command = new PutObjectCommand({ Bucket: AWS_BUCKET, Key: storageKey });

  const url  = await getSignedUrl(s3, command, { expiresIn: 3600 });
  console.log('Presigned URL: ', url );
  ctx.body = { url };
};
