import axios from 'axios';

const environment = {
  dev: {
    BASE_URL: 'http://192.168.1.2:9000/',
  },
  prod: {
    BASE_URL: 'https://....',
  },
};
const api = axios.create({
  baseURL: `${environment.dev.BASE_URL}`,
});
export default api;
