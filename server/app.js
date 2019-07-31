const Koa = require('koa');
const router = require('./router');
const bodyParser = require('koa-bodyparser');

require('./model');


const app = new Koa();

app
  .use(bodyParser())
  .use(router.routes())
  .listen(3003, () => console.log('Server is running at 3003...'));
