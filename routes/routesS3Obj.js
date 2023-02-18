// import only required S3 clients and commands
const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner")
const fs = require('fs');
const axios = require('axios');    

const client = new S3Client({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY
  },
  region: process.env.AWS_REGION
});

// async function objUpload(ctx) {
//   const { fileNameLocal, fileNameS3 } = ctx.query;

//   const command = new PutObjectCommand({
//     Bucket: process.env.AWS_BUCKET,
//     Key: fileNameS3,
//     Body: fs.readFileSync(fileNameLocal)
//   });

//   try {
//     const response = await client.send(command);
//     ctx.body = JSON.stringify({response});
//   } catch (err) {
//     console.error('objUpload.error...')
//     console.error(`Error uploading image: ${err.message}`);
//     err.status = parseInt(err.status) || 501; 
//     throw err;
//   }
// }

// // functions
// async function objExists(ctx) {
//   console.log('inside: objExists...')
//   //const prefix = '/esp';
//   //ctx.path = ctx.path.slice(ctx.path.indexOf(prefix) + prefix.length);
// }

async function urlUpload(ctx) {
  const { s3Key } = ctx.query;

  const parms = {
    Bucket: process.env.AWS_BUCKET,
    Key: s3Key
  };

  try {
    const command = new PutObjectCommand(parms);
    const signedUrl = await getSignedUrl(client, command, { expiresIn: 3600 });
    ctx.body = JSON.stringify({url: signedUrl});
  } catch (err) {
    console.error('urlUpload.error...')
    err.status = parseInt(err.status) || 501; 
    throw err;
  }
}

// exports.objExists = objExists;
// exports.objUpload = objUpload;
exports.urlUpload = urlUpload;
