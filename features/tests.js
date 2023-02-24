"use strict";

const { http } = require('@vorian77/node_utilities');

module.exports.echo = async function (ctx) {
  const { parmValue } = ctx.query;
  console.log(`parm echo: ${parmValue}`);
  ctx.body = {parmValue};
}

module.exports.http_request = async function (ctx) {
  const method = ctx.query.method;
  const url = ctx.query.url;
  try {
    const response = await http(method, url, ctx.query);
    ctx.body = response.statusText;
    ctx.status = response.status;
  } catch(err) {
    throw err;
  }
}
