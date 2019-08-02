const Router = require('koa-router');
const cookie = require('koa-cookie').default;
const userController = require('./controller/user.js');


const router = new Router();

router
  .use(cookie())

  // user
  .get('/user', userController.getUserInfo)
  .post('/user/login', userController.login)
  .post('/user/register', userController.register)
  .put('/user/profile', userController.putProfile);

module.exports = router;
