const { espConnect } = require('@vorian77/node_utilities');

module.exports = async function(ctx, method, espfunction, espParms) {     
  try {
    const response = await espConnect(method, espfunction, espParms);
    ctx.status = response.status;
    ctx.body = response.body;
  } catch(err) {
    throw err;
  }
}