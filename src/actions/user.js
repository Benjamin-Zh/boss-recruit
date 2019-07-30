export const SET_USER_INFO = 'SET_USER_INFO';


/**
 * Set User Info
 * @param {Object} userInfo { userId, userName, userType }
 */
export function setUserInfo(userInfo) {
  return {
    type: SET_USER_INFO,
    payload: { userInfo },
  };
}
