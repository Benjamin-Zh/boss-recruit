const BaseController = require('./base');
const { getModel } = require('../model');
const ERROR_TYPES = require('../constants/errorTypes');


class UserController extends BaseController {
  constructor() {
    super();

    this.getUserInfo = this.getUserInfo.bind(this);
    this.register = this.register.bind(this);
  }

  async register(ctx, next) {
    const User = getModel('User');
    const { body: userInfo } = ctx.request;

    if (await User.findOne({ userName: userInfo.userName })) {
      return this.fail(ctx, ERROR_TYPES.USER.USERNAME_REPEAT);
    }

    const user = await User.create({
      userName: userInfo.userName,
      password: userInfo.password,
      userType: Boolean(userInfo.userType),
    });

    this.success(ctx, {
      userName: user.userName,
      userId: user._id,
      userType: user.userType,
    });

    await next();
  }

  async getUserInfo(ctx, next) {
    this.success(ctx, { nickname: 'hi' });
    await next();
  }
}

module.exports = new UserController();
