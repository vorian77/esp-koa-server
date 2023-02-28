"use strict";

require('dotenv').config();
const http = require('../util/http.js');

module.exports = async function(ctx) {
  const method = ctx.request.method;
  const url = process.env.ESP_DB_URL + '/esp/ws_sms_update';

  try {
    const response = await http(method, url, ctx);
    ctx.status = response.status;
    ctx.body = response.data;
  } catch (err) {
    console.error(`textStatusCallback error...\nURL: ${url} \nQuery Params: ${JSON.stringify(ctx.query)}`);
    const newErr = new Error(err.message);
    newErr.status = err.status;
    throw newErr;
  }
}
