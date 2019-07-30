/**
 * Create Reducer
 * @param {Object} initialState 
 * @param {Object} handlers 
 */
export function createReducer(initialState, handlers) {
  return function (state = initialState, action) {
    if (Object.prototype.hasOwnProperty.call(handlers, action.type)) {
      return handlers[action.type](state, action);
    }

    return state;
  }
}

/**
 * Format Error
 * @param {Error} error 
 * @param {Boolean} withCode 
 */
export function formatError(error, withCode) {
  if (!error) return null;

  const { message = '未知错误', code = -1 } = error;
  let res = message;

  if (withCode) {
    res = `${res}（${code}）`;
  }

  return res;
}

/**
 * Sleep
 * @param {Number} duration 
 */
export function sleep(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}
