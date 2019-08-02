import http from '../../utils/http';
import { USER_INFO, LOGIN, REGISTER, PROFILE } from './constants';


export function getUserInfo() {
  return http.get(USER_INFO);
}

export function login({ userName, password }) {
  return http.post(LOGIN, { userName, password });
}

export function register({ userName, password, userType }) {
  return http.post(REGISTER, { userName, password, userType });
}

export function putProfile(data) {
  return http.put(PROFILE, data);
}
