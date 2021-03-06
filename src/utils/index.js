import { createFormField } from 'rc-form';
import { USER_TYPE } from '../constants';
import mapValues from 'lodash/mapValues';


/**
 * Noop
 */
export function noop() {}

/**
 * Make Enum
 * @param {Object} enumerable 
 */
export function makeEnum(enumerable) {
  const res = { ...enumerable };

  Object.entries(enumerable).forEach(([key, value]) => {
    res[value] = key;
  });

  return res;
}

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
 * Make Error
 * @param {String} message 
 * @param {Number} code 
 */
export function makeError(message, code = -1) {
  if (message === null) return null;

  const error = new Error(message);

  Object.defineProperty(error, 'code', {
    enumerable: false,
    value: code,
  });

  return error;
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

/**
 * Get Logged User Redirect Path
 * @param {Object} userInfo 
 */
export function getLoggedUserRedirectPath(userInfo) {
  if (userInfo.hasDetail) return '/profile';

  const SUB_PATHES = {
    [USER_TYPE.GENIUS]: 'genies',
    [USER_TYPE.BOSS]: 'boss',
  };

  return `/complete-profile/${SUB_PATHES[userInfo.userType]}`;
}

/**
 * Get Component Display Name
 * @param {React.Component} component 
 */
export function getComponetDisplayName(component) {
  return component.displayName || component.name || 'Anonymous Component';
}

/**
 * Map To RC Form Fields
 * @param {Object} fields 
 */
export function mapToRCFormFields(fields) {
  return mapValues(fields, field => createFormField({ value: field }));
}

/**
 * Create Form Fields
 * @param {Object} fields 
 */
export function createFormFields(fields) {
  return mapValues(fields, field => createFormField(field));
}
