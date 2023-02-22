const { request } = require('../features/http_request.js');

module.exports.echo = async function (ctx) {
  const { parmValue } = ctx.query;
  console.log(`parm echo: ${parmValue}`);
  ctx.body = {parmValue};
}

module.exports.http_request = async function (ctx) {
  const method = ctx.query.method;
  const url = ctx.query.url;
  try {
    const response = await request(method, url, ctx.query);
    ctx.body = response.statusText;
    ctx.status = response.status;
  } catch(err) {
    throw err;
  }
}
