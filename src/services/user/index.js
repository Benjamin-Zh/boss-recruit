import http from '../../utils/http';
import { LOGIN, REGISTER } from './constants';


export function login({ userName, password }) {
  return http.post(LOGIN, { userName, password });
}

export function register({ userName, password, userType }) {
  return http.post(REGISTER, { userName, password, userType });
}
