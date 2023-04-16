"use strict"

// resources - koa
const Koa = require("koa")
const cors = require("@koa/cors")
const { koaBody } = require("koa-body")
const json = require("koa-json")

// resources - other
const fs = require("fs")
const https = require("https")
const path = require("path")
require("dotenv").config({ path: path.join(process.cwd(), ".env") })

// resources - application
const { apiRouter } = require("./routes/routes.js")
const { logger } = require("./util/logger.js")

//environment parms
const PORT = process.env.PORT

// app
const app = new Koa()
app
  .use(handleErrors)
  .use(cors())
  .use(koaBody())
  .use(json())
  .use(apiRouter.routes())
  .use(apiRouter.allowedMethods)

if (process.env.HTTPS_CERT == "DEVELOPMENT") {
  // https listener - certificates
  var options = {
    pfx: fs.readFileSync(process.env.HTTPS_CERT),
    passphrase: process.env.HTTPS_CERT_PW,
  }

  // https listener - listener
  https.createServer(options, app.callback()).listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`)
  })
} else {
  app.listen(PORT, logStart(PORT))
}

function logStart(port) {
  const runtimeDir = process.cwd()
  const startMsg = `ESP-API started - Port: ${port} - Run time directory: ${runtimeDir}\r\n`
  logger(startMsg)
}

// error handler for all processing within app
// ctx.throw([status], [msg], [properties]) - future implementation
// http://man.hubwiz.com/docset/koa.docset/Contents/Resources/Documents/context.html
async function handleErrors(ctx, next) {
  try {
    await next()
  } catch (err) {
    ctx.status = err.status || 500
    console.error(err.stack)
    ctx.body = {
      status: ctx.status,
      message: err.stack,
    }
  }
}
