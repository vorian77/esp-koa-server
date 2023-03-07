const Router = require('koa-router');

const { sendEmail, sendText } = require('./routesMsgFunctions.js');
<<<<<<< HEAD
const sendEmailAlertEsp = require('./routesMsgFunctionsEmailAlertEsp.js');
=======
const sendEmailAlertEsp = require('./routesMsgFunctionsEspEmailAlert.js');
>>>>>>> 95a641a474a471a155c8bc6ca5d840f20d6cd373

const msgRouter = new Router({ prefix: '/msg' });

msgRouter.post('/send_email', async (ctx) => { await sendEmail(ctx); });
msgRouter.post('/send_email_alert_esp', async (ctx) => { await sendEmailAlertEsp(ctx); });
msgRouter.post('/send_text', async (ctx) => { await sendText(ctx); });

exports.msgRouter = msgRouter;

