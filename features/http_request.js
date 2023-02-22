const axios = require('axios'); 
const qs = require('qs'); 

module.exports.request = async function (method, url, queryParms) {
  let options;
  queryParms = qs.stringify(queryParms);

  switch(method.toLowerCase()) {
    case 'get':
      options = { method, url: url + '?' + queryParms }
      break;

    default:
      options = { method, url, data: queryParms }
  }
    
  try {
      console.log('Axios options...', options);
      const response = await axios(options);
      console.log('Axios successful.');
      return response
    } catch(err) {
      err.status = err.response.status;
      throw err;
    }
}
