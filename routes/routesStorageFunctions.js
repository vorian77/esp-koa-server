// AWS-S3

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

async function imgUrlUpload(ctx) {
  const { PutObjectCommand } = require("@aws-sdk/client-s3");
  const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");      
  const { storageKey, contentType } = ctx.query;

  const command = new PutObjectCommand({ Bucket: AWS_BUCKET, Key: storageKey, ContentType: 'image/jpg' });

  const url  = await getSignedUrl(s3, command, { expiresIn: 3600 });
  console.log('Presigned URL: ', url );
  ctx.body = { url };
};

module.exports.imgUpload = async function(ctx) {
  const fs = require('fs');
  const axios = require('axios'); 
  const qs = require('qs');
  const { PutObjectCommand } = require("@aws-sdk/client-s3"); 
  
  const { storageKey, contentType, fileName } = ctx.query;

  // async function uploadImage(url, data, headers) {
  //   const response = await fetch(url, {
  //     method: "PUT",
  //     headers: headers,
  //     body: data
  //   });
  //   ctx.body = response;
  // }

  // get url
  await imgUrlUpload(ctx);
  const presignedUrl = ctx.body.url;

  // function to encode file data to base64 encoded string
  // read binary data
  const mime = 'image/jpeg';
  const encoding = 'base64';
  const data = fs.readFileSync(fileName).toString(encoding);
  const dataUri = 'data:' + mime + ';' + encoding + ',' + data;

  const base64Data = new Buffer.from(data, 'base64');
  //const file = await readFile(fileName);
  const file = fs.readFileSync(fileName);
  
  const putHeaders = {
    'Content-Type': 'image/jpeg'
  };
  const webHook = 'https://webhook.site/14818aef-1006-49a1-866d-55b4cad4fb03';
  const request = require('request');
  // const response = request({
  //   method: 'PUT',
  //   url: presignedUrl,
  //   body: file,
  //   headers: putHeaders
  // });
  // ctx.body = response;

  // const fetch = require('node-fetch');
  // const respFetch = await fetch(presignedUrl, {
  //   method: 'PUT',
  //   url: presignedUrl,
  //   //url: webHook,
  //   body: file,
  //   headers: putHeaders
  // });
  // ctx.body = respFetch;


  // const axiosParms = {
  //   data: file};

  // const axiosHeaders = {
  //   'Content-Type': 'application/octet-stream'
  // };


// const httpOptions = {
//   url: presignedUrl,
//   data: qs.stringify(file),
//   method: 'put',
//   headers: { 'Content-Type': 'image/jpeg' }
// }

const postData = new FormData(); 
postData.append("file", file); 
try {
  const axiosResponse = await axios.put(presignedUrl, postData);
  ctx.body = axiosResponse;
} catch(err) {
  ctx.body = err.message;
  
}

// const axiosResponse = await axios(httpOptions);
// ctx.body = axiosResponse;

  // const axiosResponse = await axios.put(presignedUrl, dataUri, { axiosHeaders });
  //console.info(axiosResponse)

 
  //const s3Body = Buffer.from(dataUri).toString('base64')

  //var buf = new Buffer(b64string, 'base64');

  // let array = [];
  // for (var i = 0; i < data.length; i++) {
  //   array.push(data.charCodeAt(i));
  // }
  
  // const s3Body = new Blob([new Uint8Array(array)], {
  //   type: mime
  // });
  



  // console.log('1: ',dataUri);
  //  var binary = atob(dataURI.split(',')[1]);
  //  var array = [];
  //  console.log('2: ',binary.length);
  //  for (var i = 0; i < binary.length; i++) {
  //     array.push(binary.charCodeAt(i));
  //  }
  // return new Blob([new Uint8Array(array)], {
  // type: 'application/pdf'
  // });
  
  // convert binary data to base64 encoded string
  //const buffer64 = Buffer.from(bitmap).toString('base64')
  //return new Buffer(bitmap).toString('base64');
  

  // console.log(Buffer.from("Hello World").toString('base64'));
  // console.log(Buffer.from("SGVsbG8gV29ybGQ=", 'base64').toString('ascii'))
  
  //const fileBase64 =  base64_encode(fileName);


  //const storageBody = Buffer.from(bitmap.replace(/^data:image\/\w+;base64,/, ""),'base64')
  //var buf = Buffer.from(req.body.imageBinary.replace(/^data:image\/\w+;base64,/, ""),'base64')
  // let parms = {
  //   Bucket: AWS_BUCKET,
  //   Key: storageKey, 
  //   Body: base64Data,
  //   ContentEncoding: encoding,
  //   ContentType: mime
  // };
  //const command = new PutObjectCommand(parms);
  //const result = await s3.send(command);
  //ctx.body = result;
  

 
  //const presignedUrl = 'https://webhook.site/14818aef-1006-49a1-866d-55b4cad4fb03';

// Promise.resolve(promise).then(function(buffer){
//      console.log(buffer);
// });
  
//   const response = await fetch(ctx.fileName);
//   const content = await response.blob();
//   console.log(content.size);
//   fetch(presignedUrl, { method: 'PUT', body: content });

  // const fileType = encodeURIComponent('.jpg');
  // const formData = new FormData();
  // formData.append("image", ctx.query.fileName);
  // const response = await fetch(presignedUrl, {
  //   method: "PUT",
  //   headers: { 'Content-Type': 'image/jpeg' },
  //   body: formData
  // });

  // const response = await fetch(presignedUrl, {
  //   method: "PUT",
  //   //headers: { 'Content-Type': 'image/jpeg' },
  //   headers: { 'Content-Type': 'application/octet-stream' },
  //   body: ctx.query.fileName
  //   //mode: "cors"
  // });

  //const myHeaders = { 'Content-Type': 'multipart/form-data' };
  //const myHeaders = { 'Content-Type': 'image/jpeg' };
    
  //await uploadImage(presignedUrl, formData, myHeaders);
};

// const response = await fetch("https://wiki.epfl.ch/lapa-studio/documents/DTS/laser%20tutorial.pdf");
// const content = await response.blob();
// console.log(content.size);
// fetch("https://wiki.epfl.ch/test.php", { method: 'POST', body: content });

// const response = await fetch("https://wiki.epfl.ch/lapa-studio/documents/DTS/laser%20tutorial.pdf");
// const content = await response.blob();
// console.log(content.size);
// const formData = new FormData();
// formData.append("content", content);
// fetch("https://wiki.epfl.ch/test.php", { method: 'POST', body: formData });

exports.imgUrlUpload = imgUrlUpload