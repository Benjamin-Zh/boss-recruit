import { createReducer } from '../../utils';
import { SET_ERROR, SET_LOADING } from './actions';


export const initialState = {
  ui: {
    error: null,
    loading: false,
  },
};

export default createReducer(initialState, {
  [SET_ERROR](state, action) {
    return {
      ...state,
      ui: {
        ...state.ui,
        error: action.payload.error,
      },
    };
  },
  [SET_LOADING](state, action) {
    return {
      ...state,
      ui: {
        ...state.ui,
        loading: action.payload.state,
      },
    };
  },
});
