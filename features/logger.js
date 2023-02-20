const fs = require('fs');
const path = require('path');

function logger(msg) {
  const runtimeDir = process.cwd();
  const logFile = path.join(runtimeDir, 'esp_api_log.txt');
  msg = `${new Date()}: ${msg}\r\n`;
  //fs.appendFile(logFile, msg, function (err) { if (err) throw err; });
  console.log(msg);
};

exports.logger = logger;