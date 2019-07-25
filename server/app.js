const Koa = require('koa');
const Router = require('koa-router');
const cookie = require('koa-cookie').default;
const mongoose = require('mongoose');

const DB_URL = 'mongodb://localhost:27017/boss-recruit';

mongoose.connect(DB_URL, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  console.log('mongodb connected...');
});

const User = mongoose.model('user', new mongoose.Schema({
  userName: { type: String, require: true },
  age: { type: Number, require: true },
}));

// User.create({ 
//   userName: '',
//   age: 24,
// });

const app = new Koa();
const router = new Router();

router
  .use(cookie())
  .get('/', async (ctx, next) => {
    const body = `<h3>Koa App</h3>`;

    ctx.set('Content-Type', 'text/html');
    ctx.body = body;

    await next();
  })
  .get('/data', async (ctx, next) => {
    const res = await User.find({});

    ctx.body = res;

    await next();
  });

app
  .use(router.routes())
  .listen(3003, () => console.log('Server is running at 3003...'));
