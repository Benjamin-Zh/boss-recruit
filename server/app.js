const Koa = require('koa');
const router = require('./router');

require('./model');


const app = new Koa();

app
  .use(router.routes())
  .listen(3003, () => console.log('Server is running at 3003...'));
