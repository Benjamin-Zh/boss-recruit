import http from '../../utils/http';
import { sleep } from '../../utils';


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
      userName, password, confirmPassword, type,
    } = userInfo;
  
    userName = userName.trim();
    password = password.trim();
    confirmPassword = confirmPassword.trim();

    // form validation
    try {
      if (!userName) throw new Error('用户名不能为空');
      if (userName.length < 6 || userName.length > 12) throw new Error('用户名长度为 6 - 12 个字符');
      if (!password) throw new Error('密码不能为空');
      if (password.length < 6 || password.length > 12) throw new Error('密码长度为 6 - 12 个字符');
      if (!confirmPassword) throw new Error('密码确认不能为空');
      if (password !== confirmPassword) throw new Error('两次密码输入不一致');
      dispatch(resetError());
    } catch (err) {
      dispatch(setError(err.message));
      throw new Error(err.message);
    }

    // call register service
    try {
      dispatch(setLoading(true));
      const userInfo = await http.post('/user/register', { userName, password, type });

      await sleep(1000);

      return userInfo.data;
    } catch (err) {
      dispatch(setError('注册失败，请稍后重试'));
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };
}