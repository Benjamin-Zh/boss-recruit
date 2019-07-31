const Router = require('koa-router');
const cookie = require('koa-cookie').default;
const userController = require('./controller/user.js');


const router = new Router();

router
  .use(cookie())

  // user
  .get('/user/info', userController.getUserInfo)
  .post('/user/register', userController.register);

module.exports = router;