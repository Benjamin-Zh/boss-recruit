import { makeError } from "../../utils";
import * as services from '../../services/user';
import ERROR_TYPES from './constants/errorTypes';


// action types
export const SET_ERROR = 'SET_ERROR_LOGIN';
export const SET_LOADING = 'SET_LOADING_LOGIN';

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

export function login(userInfo) {
  return async dispatch => {
    const { userName, password } = userInfo;

    try {
      if (!userName) throw new Error('Empty username');
      if (userName.length < 5 || userName.length > 12) throw new Error('Username required 5 - 12 characters');
      if (!password) throw new Error('Empty password');
      if (password.length < 6 || password.length > 12) throw new Error('Password required 6 - 12 characters');
      dispatch(resetError());
    } catch (err) {
      dispatch(setError(err.message));
      throw err;
    }

    try {
      dispatch(setLoading(true));
      const { data: userInfo } = await services.login({ userName, password });

      return userInfo;
    } catch (err) {
      dispatch(setError(ERROR_TYPES[err.code] || 'Login fail, try it later'));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };
}
