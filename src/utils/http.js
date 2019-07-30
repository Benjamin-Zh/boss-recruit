import axios from 'axios';


const instance = axios.create({
  timeout: 3000,
});

instance.interceptors.response.use(
  response => {
    const { data } = response;

    if (!data.success) {
      const error = new Error(data.message);

      Object.defineProperty(error, 'code', {
        enumerable: false,
        value: data.code,
      });

      return Promise.reject(error);
    }

    return response.data;
  },
  error => Promise.reject(error),
);

export default instance;
