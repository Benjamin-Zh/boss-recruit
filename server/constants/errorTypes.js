const { makeError } = require('../utils');


module.exports = {

  // user
  USER: {
    USERNAME_REPEAT: makeError(20001, 'Username Repeat'),
    USER_DO_NOT_EXIST: makeError(20002, 'User Do Not Exist'),
    INVALID_PASSWORD: makeError(20003, 'Invalid Password'),
  },

};
