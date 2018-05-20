const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors');
const router = require('./router');
const requestHandler = require('./middlewares/requestHandler');

const mongodb = require('./core/mongodb')

mongodb.connect()

const host = process.env.HOST || '127.0.0.1';
const port = process.env.PORT || 2333;
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = new Koa();

app.use(bodyParser())

app.use(requestHandler);

app.use(cors());

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port, host);
console.log('Blog API Server listening on http://' + host + ':' + port);
