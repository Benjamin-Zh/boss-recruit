const { makeError } = require('../utils');


module.exports = {

  // user
  USER: {
    USERNAME_REPEAT: makeError(20001, 'Username Repeat'),
  },

};
