const axios = require('axios');    
const qs = require('qs'); 

async function espConnect(ctx) {
  await setPath(ctx);
  await encryptPassword(ctx);
  await transmit(ctx);
}

async function transmit(ctx) {
  const functionNameError = 'espConnect'
  let status, body;

  try {
    // set HTTP options
    const options = {
      method: ctx.request.method,
      url: ctx.espDbUrl + ctx.path,
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data: qs.stringify(ctx.query)
    };
      
    // execute HTTP
    try {
      console.log(`${functionNameError}.Axios.options...`, options);
      const rtn = await axios(options);
      console.log(`${functionNameError}.Axios request was successful.`)
      ctx.body = Array.isArray(rtn.data) ? rtn.data[0] : rtn.data;
      ctx.status = rtn.status;

    } catch(err) {
      console.log(`${functionNameError}.Axios.error...`)
      body = JSON.stringify(err.response.data) || err.response.statusText || err.message;
      status = parseInt(err.response.status);
      
      const newErr = new Error(body);
      newErr.status = status;
      throw newErr;
    }      
    
  } catch(err) {
    console.log(`${functionNameError}.final.error...`)
    err.status = parseInt(err.status) || 501; 
    throw err;
  }  
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

exports.espConnect = espConnect;