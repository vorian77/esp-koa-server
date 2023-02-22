const { request } = require('../features/http_request.js');

module.exports.espConnect = async function (ctx) {
  await setPath(ctx);
  await encryptPassword(ctx);
  await transmit(ctx);
}

// functions
async function setPath(ctx) {
  // set path as the esp web service name
  const prefix = '/esp';
  ctx.path = ctx.path.slice(ctx.path.indexOf(prefix) + prefix.length);
}

async function encryptPassword(ctx) {
  if (ctx.query.password) {
    console.log('has pw');  
  } 
}

async function transmit(ctx) {
  const functionNameError = 'espConnect'

  const method = ctx.request.method;
  const url = ctx.espDbUrl + ctx.path;
  const parms = ctx.query;
    
  try {
    const rtn = await request(method, url, parms);

    // ESP specific success processing
    if (Array.isArray(rtn.data)) {
        ctx.body = (rtn.data.length == 1) ? rtn.data[0] : rtn.data;
    } else {
      ctx.body = rtn.data
    } 

    ctx.status = rtn.status
      
  } catch(err) {
    // ESP specific error processing
    console.log(`${functionNameError}.error...`);
    const body = JSON.stringify(err.response.data) || err.response.statusText || err.message;
    const status = parseInt(err.response.status);
    
    const newErr = new Error(body);
    newErr.status = status;
    throw newErr;
  }        
}
