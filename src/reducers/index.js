import { combineReducers } from 'redux';
import user, { initialState as userInitialState } from './user';
import system, { initialState as systemInitialState } from './system';
import register, { initialState as registerInitialState } from '../pages/Register/reducers';
import login, { initialState as loginInitialState } from '../pages/Login/reducers';


// state shape
// eslint-disable-next-line no-unused-vars
const stateShape = {
  user: userInitialState,
  register: registerInitialState,
  login: loginInitialState,
  system: systemInitialState,
};

console.log('🧬state shape:', stateShape);

export default combineReducers({
  user,
  register,
  login,
  system,
});
