import axios from 'axios';


const instance = axios.create({
  timeout: 3000,
});

instance.interceptors.response.use(
  response => response.data,
  error => Promise.reject(error),
);

export default instance;
