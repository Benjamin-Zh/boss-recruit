import http from '../../utils/http';
import { sleep } from '../../utils';
import ERROR_TYPES from './constants/errorTypes';


// action types
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';

// action creators
function setError(errorMessage, code) {
  if (errorMessage === null) {
    return {
      type: SET_ERROR,
      payload: { error: null },
    };
  }

  const error = new Error(errorMessage);

  if (typeof code !== undefined) {
    Object.defineProperty(error, 'code', {
      enumerable: false,
      value: code,
    });
  }

  return {
    type: SET_ERROR,
    payload: { error },
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
      if (userName.length < 6 || userName.length > 12) throw new Error('Username required 6 - 12 characters');
      if (!password) throw new Error('Empty password');
      if (password.length < 6 || password.length > 12) throw new Error('Password required 6 - 12 characters');
      if (!confirmPassword) throw new Error('Empty confirm password');
      if (password !== confirmPassword) throw new Error('Password and confirm password not same');
      dispatch(resetError());
    } catch (err) {
      dispatch(setError(err.message));
      throw new Error(err.message);
    }

    // call register service
    try {
      dispatch(setLoading(true));
      const userInfo = await http.post('/user/register', { userName, password, userType });

      await sleep(1000);

      return userInfo.data;
    } catch (err) {
      dispatch(setError(ERROR_TYPES[err.code] || 'Register fail, try it later'));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };
}
