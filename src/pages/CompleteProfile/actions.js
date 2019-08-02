import mapValues from 'lodash/mapValues';
import { FORM_STATE_KEYS } from './constants';
import { putProfile } from '../../services/user';
import { makeError, sleep } from '../../utils';
import ERROR_TYPES from './constants/errorTypes';


export const UPDATE_FIELDS = 'UPDATE_FIELDS';
export const SET_LOADING = 'SET_LOADING_COMPLETE_PROFILE';
export const SET_ERROR = 'SET_ERROR_COMPLETE_PROFILE';

export function updateFields(fields, userType) {
  return {
    type: UPDATE_FIELDS,
    payload: { fields },
    meta: { userType },
  };
}

function setLoading(state) {
  return {
    type: SET_LOADING,
    payload: { state },
  };
}

function setError(message, code) {
  return {
    type: '',
    payload: { error: makeError(message, code) },
  };
}

export function submitProfile(userType) {
  return async (dispatch, getState) => {
    const state = getState();
    const formStateKey = FORM_STATE_KEYS[userType];
    const { [formStateKey]: formData } = state.completeProfile;
    const profile = mapValues(formData, item => item.value);

    console.log(profile);

    try {
      dispatch(setLoading(true));
      await sleep(1000);
      await putProfile(profile);
    } catch (err) {
      dispatch(setError(ERROR_TYPES[err.code] || 'Submit fail, try it later'))
      throw err;
    } finally {
      dispatch(setLoading(false));
    }
  };
}
