import http from '../../utils/http';
import { sleep } from '../../utils';


// action types
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';
// export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';

// action creators
function setError(errorMessage, code) {
  const error  = new Error(errorMessage);

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

// function registerSuccess(userInfo) {
//   return {
//     type: REGISTER_SUCCESS,
//     payload: { userInfo },
//   };
// }

export function register(userInfo) {
  const {
    userName, password, confirmPassword, type,
  } = userInfo;

  // if (!userName) return setError('用户名不能为空');
  // if (userName.length < 6 || userName.length > 12) return setError('用户名长度为 6 - 12 个字符');
  // if (!password) return setError('密码不能为空');
  // if (password.length < 6 || password.length > 12) return setError('密码长度为 6 - 12 个字符');
  // if (!confirmPassword) return setError('密码确认不能为空');
  // if (password !== confirmPassword) return setError('两次密码输入不一致');

  return async dispatch => {
    dispatch(setLoading(true));

    try {
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
