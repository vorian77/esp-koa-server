"use strict";

const http = require('../util/http.js');
const sendEmail = require('../util/msgMail.js');
const sendText = require('../util/msgText.js');

module.exports.testEchoGet = async function (ctx) {
  console.log(`parm echo: ${JSON.stringify(ctx.query)}`);
  ctx.body = ctx.query;
}

module.exports.testEchoPost = async function (ctx) {
  console.log(`parm echo: ${JSON.stringify(ctx.query)}`);
  ctx.body = ctx.request.body;
}

module.exports.testHttp = async function (ctx) {
  const method = ctx.request.body.method;
  const url = ctx.request.body.url;

  try {
    const response = await http(method, url, ctx);
    ctx.body = response.statusText;
    ctx.status = response.status;
  } catch(err) {
    throw err;
  }
}

