import { makeError } from '../../utils';
import ERROR_TYPES from './constants/errorTypes';
import * as services from '../../services/user';


// action types
export const SET_ERROR = 'SET_ERROR_REGISTER';
export const SET_LOADING = 'SET_LOADING';

// action creators
function setError(message, code) {
  return {
    type: SET_ERROR,
    payload: { error: makeError(message, code) },
  };
}

function setLoading(state) {
  return {
    type: SET_LOADING,
    payload: { state },
  };
}

export function resetError() {
  return setError(null);
}

export function register(userInfo) {
  return async dispatch => {
    let {
      userName, password, confirmPassword, userType,
    } = userInfo;

    userName = userName.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    // form validation
    try {
      if (!userName) throw new Error('Empty username');
      if (userName.length < 5 || userName.length > 12) throw new Error('Username required 5 - 12 characters');
      if (!password) throw new Error('Empty password');
      if (password.length < 6 || password.length > 12) throw new Error('Password required 6 - 12 characters');
      if (!confirmPassword) throw new Error('Empty confirm password');
      if (password !== confirmPassword) throw new Error('Password and confirm password not same');
      dispatch(resetError());
    } catch (err) {
      dispatch(setError(err.message));
      throw err;
    }

    // call register service
    try {
      dispatch(setLoading(true));
      const { data: userInfo } = await services.register({ userName, password, userType });

      return userInfo;
    } catch (err) {
      dispatch(setError(ERROR_TYPES[err.code] || 'Register fail, try it later'));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };
}
