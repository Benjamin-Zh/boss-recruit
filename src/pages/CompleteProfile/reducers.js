import { createReducer, wrapToRCFormFields } from '../../utils';
import { UPDATE_FIELDS } from './actions';
import { DEFAULT_SALARY_RANGE } from './components/Boss';
import { FORM_STATE_KEYS } from './constants';


export const initialState = {
  bossForm: wrapToRCFormFields({
    avatar: 0,
    position: '',
    company: '',
    salaryRange: DEFAULT_SALARY_RANGE,
    description: '',
  }),
  geniusForm: wrapToRCFormFields({

  }),
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
});
