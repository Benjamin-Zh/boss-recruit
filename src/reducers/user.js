import { createReducer } from '../utils';
import { SET_USER_INFO } from '../actions/user';


export const initialState = {
  userId: null,
  userName: '',
  userType: null,
  isLogin: false,
  hasDetail: false,
};

export default createReducer(initialState, {
  [SET_USER_INFO](state, action) {
    return {
      ...state,
      ...action.payload.userInfo,
      isLogin: true,
    };
  },
});
