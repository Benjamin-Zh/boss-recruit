import { createReducer, mapToRCFormFields } from '../../utils';
import { UPDATE_FIELDS, SET_LOADING } from './actions';
import { DEFAULT_SALARY_RANGE } from './components/Boss';
import { FORM_STATE_KEYS } from './constants';


export const initialState = {
  bossForm: mapToRCFormFields({
    avatar: 0,
    position: '',
    company: '',
    salaryRange: DEFAULT_SALARY_RANGE,
    description: '',
  }),
  geniusForm: mapToRCFormFields({
    avatar: 0,
    position: '',
    description: '',
  }),
  ui: {
    loading: false,
  },
};

export default createReducer(initialState, {
  [UPDATE_FIELDS](state, action) {
    const { payload, meta } = action;
    const formStateKey = FORM_STATE_KEYS[meta.userType];

    return {
      ...state,
      [formStateKey]: {
        ...state[formStateKey],
        ...payload.fields,
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
