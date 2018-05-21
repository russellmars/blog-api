const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const router = require('./router');
const requestHandler = require('./middlewares/requestHandler');
const config = require('./config');
const mongodb = require('./core/mongodb');

mongodb.connect();

const host = config.app_host || '127.0.0.1';
const port = config.app_port || 2333;

const app = new Koa();

app.use(bodyParser());

app.use(requestHandler);

app.use(cors({
  allowHeaders: ['Authorization']
}));

// const token = ctx.get('Authorization').slice(7)
// try {
//   var decoded = jwt.verify(token, 'secret');
// } catch(err) {
//   // err
// }


app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, host);
console.log('Blog API Server listening on http://' + host + ':' + port);
