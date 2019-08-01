const CONST = require('../constants');
const cryptoJS = require('crypto-js');


function makeError(code, message) {
  const err = new Error(message);

  Object.defineProperty(err, 'code', {
    enumerable: false,
    value: code,
  });

  return err;
}

function generateRandomString(length, alphabet = CONST.ALPHABET) {
  let result = '';

  for (let i = length; i > 0; --i) {
    result += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return result;
}

function encryptPassword(rawPassword, salt = generateRandomString(32)) {
  const passwordMD5 = cryptoJS.MD5(rawPassword).toString();
  const saltedPassword = `${passwordMD5}${salt}`;

  return {
    salt,
    password: cryptoJS.MD5(saltedPassword).toString(),
  };
}

module.exports = {
  makeError,
  generateRandomString,
  encryptPassword,
};
