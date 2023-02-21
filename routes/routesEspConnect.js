const axios = require('axios');    
const qs = require('qs'); 
const fetch = require('node-fetch');

const { logger } = require('../features/logger.js');

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
    let options;
    const url = ctx.espDbUrl + ctx.path;
    const queryParms = qs.stringify(ctx.query);
    switch(ctx.request.method.toLowerCase()) {
      case 'get':
        options = { method: ctx.request.method, url: url + '?' + queryParms }
        break;

      default:
        options = { method: ctx.request.method, url, data: queryParms }
    }
    logger(JSON.stringify(options));
      
    // execute HTTP
    try {
      console.log(`${functionNameError}.Axios.options...`, options);
      const rtn = await axios(options);
      console.log(`${functionNameError}.Axios request was successful.`);
      
      //const rtn = await getResponse(url + '?' + queryParms, ctx.request.method);
      // const rtn = await getResponse(url, ctx.request.method);
      // ctx.body = rtn;

    if (Array.isArray(rtn.data)) {
        ctx.body = (rtn.data.length == 1) ? rtn.data[0] : rtn.data;
    } else {
      ctx.body = rtn.data
    } 

      ctx.status = rtn.status
        
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

async function getResponse(url, method1) {
  const response = await fetch(url);
  const data = await response.text();
  return data;
}

exports.espConnect = espConnect;