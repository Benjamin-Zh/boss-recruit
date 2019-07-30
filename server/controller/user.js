const BaseController = require('./base');


class UserController extends BaseController {
  constructor() {
    super();

    this.getUserInfo = this.getUserInfo.bind(this);
    this.register = this.register.bind(this);
  }

  async register(ctx, next) {
    this.success(ctx, { userName: 'Remiel', userId: 10001, userType: 0 });
    await next();
  }

  async getUserInfo(ctx, next) {
    this.success(ctx, { nickname: 'hi' });
    await next();
  }
}

module.exports = new UserController();
