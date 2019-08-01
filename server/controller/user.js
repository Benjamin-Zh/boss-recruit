const BaseController = require('./base');
const { getModel } = require('../model');
const ERROR_TYPES = require('../constants/errorTypes');
const { encryptPassword } = require('../utils');


class UserController extends BaseController {
  constructor() {
    super();

    this.getUserInfo = this.getUserInfo.bind(this);
    this.register = this.register.bind(this);
    this.login = this.login.bind(this);
  }

  async getUserInfo(ctx, next) {
    const { userInfo } = ctx.session;
    const body = userInfo
      ? { ...userInfo, isLogin: true }
      : { isLogin: false };

    this.success(ctx, body);
    await next();
  }

  async register(ctx, next) {
    const User = getModel('User');
    const { body: userInfo } = ctx.request;

    if (await User.findOne({ userName: userInfo.userName })) {
      this.fail(ctx, ERROR_TYPES.USER.USERNAME_REPEAT);

      return await next();
    }

    const { salt, password } = encryptPassword(userInfo.password);
    const user = await User.create({
      userName: userInfo.userName,
      password,
      salt,
      userType: Boolean(userInfo.userType),
      hasDetail: false,
    });

    this.success(ctx, {
      userName: user.userName,
      userId: user._id,
      userType: user.userType,
      hasDetail: false,
    });

    await next();
  }

  async login(ctx, next) {
    const User = getModel('User');
    const { userName, password } = ctx.request.body;
    const user = await User.findOne({ userName });

    if (!user) {
      this.fail(ctx, ERROR_TYPES.USER.USER_DO_NOT_EXIST);

      return await next();
    }
    
    const { password: encryptedPassword } = encryptPassword(password, user.salt);

    if (encryptedPassword === user.password) {
      const userInfo = {
        userName: user.userName,
        userId: user._id,
        userType: user.userType,
        hasDetail: user.hasDetail,
      };

      ctx.session.userInfo = userInfo;
      this.success(ctx, userInfo);
    } else {
      this.fail(ctx, ERROR_TYPES.USER.INVALID_PASSWORD);
    }

    await next();
  }
}

module.exports = new UserController();
