const Koa = require('koa');
const router = require('./router');
const bodyParser = require('koa-bodyparser');
const session = require('koa-session');

require('./model');


const app = new Koa();
const sessionConfig = {
  key: 'boss-recruit',
};

app.keys = ['boss recruit server'];

app
  .use(bodyParser())
  .use(session(sessionConfig, app))
  .use(router.routes())
  .listen(3003, () => console.log('Server is running at 3003...'));
