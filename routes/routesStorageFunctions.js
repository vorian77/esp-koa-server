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
  const bucketParams = { Bucket: AWS_BUCKET, Key: ctx.query.s3Key };

  try {
    const data = await s3.send(new DeleteObjectCommand(bucketParams));
    console.log("Success. Object deleted.", data);
    ctx.body = data;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports.imgList = async function(ctx) {
  const { ListObjectsV2Command } = require("@aws-sdk/client-s3");
  const command = new ListObjectsV2Command({
    Bucket: AWS_BUCKET
  });

  try {
    let isTruncated = true;

    console.log("Your bucket contains the following objects:\n")
    let contents = "";

    while (isTruncated) {
      const { Contents, IsTruncated, NextContinuationToken } = await s3.send(command);
      const contentsList = Contents.map((c) => ` • ${c.Key}`).join("\n");
      contents += contentsList + "\n";
      isTruncated = IsTruncated;
      command.input.ContinuationToken = NextContinuationToken;
    }
    console.log(contents);
    ctx.body = contents;
  } catch (err) {
    console.error(err);
  }
}

module.exports.imgUploadText = async function(ctx) {
  const { PutObjectCommand } = require("@aws-sdk/client-s3"); 
  
  const command = new PutObjectCommand({ 
    Bucket: AWS_BUCKET, 
    Key: ctx.query.s3Key,
    Body: ctx.query.text
  });

  try {
    const response = await s3.send(command);
    console.log(response);
    ctx.body = response;
  } catch (err) {
    console.log("Error", err);
  }
};

module.exports.imgUrlDownload = async function(ctx) {
  const { GetObjectCommand } = require("@aws-sdk/client-s3");
  const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
  const { s3key } = ctx.query;

  const command = new GetObjectCommand({ Bucket: AWS_BUCKET, Key: s3key });
  const preSignedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

  console.log('Presigned URL: ', preSignedUrl );
  ctx.body = preSignedUrl ;
};

module.exports.imgUrlUpload = async function(ctx) {
  const { PutObjectCommand } = require("@aws-sdk/client-s3");
  const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");      
  const {s3key, contentType} = ctx.query;

  const command = new PutObjectCommand({Bucket: AWS_BUCKET, Key: s3key });

  const preSignedUrl  = await getSignedUrl(s3, command, { expiresIn: 3600 });
  console.log('Presigned URL: ', preSignedUrl );
  ctx.body = preSignedUrl ;
};
