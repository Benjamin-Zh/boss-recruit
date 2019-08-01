import { createReducer } from '../utils';
import { SET_LOGIN_REDIRECT_PATH } from '../actions/system';


export const initialState = {
  loginRedirectPath: null,
};

export default createReducer(initialState, {
  [SET_LOGIN_REDIRECT_PATH](state, action) {
    return {
      ...state,
      loginRedirectPath: action.payload.url,
    };
  },
});
