export const SET_LOGIN_REDIRECT_PATH = 'SET_LOGIN_REDIRECT_PATH';

export function setLoginRedirectPath(url) {
  return {
    type: SET_LOGIN_REDIRECT_PATH,
    payload: { url },
  };
}
