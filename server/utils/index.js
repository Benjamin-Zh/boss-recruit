function makeError(code, message) {
  const err = new Error(message);

  Object.defineProperty(err, 'code', {
    enumerable: false,
    value: code,
  });

  return err;
}

module.exports = {
  makeError,
};
