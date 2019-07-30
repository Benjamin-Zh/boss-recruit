class BaseController {
  success(ctx, data) {
    ctx.body = {
      success: true,
      code: 0,
      message: 'ok',
      data,
    };
  }

  fail(ctx, error) {
    ctx.body = {
      success: false,
      code: error.code,
      message: error.message,
      data: null,
    };
  }
}

module.exports = BaseController;
