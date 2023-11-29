import { BASE_URL } from '@/constants';
import { getLocalStorage } from '@/libs';
import axios from 'axios';

const $axios = axios.create({
  baseURL: BASE_URL,
});

const setToken = (config: any) => {
  if (!config?.headers?.authorization) {
    const token = getLocalStorage('access-token');
    if (token && config.headers) {
      config.headers.authorization = `Bearer ${token}`;
    }
  }

  return config;
};

const requestMapper = (config: any) => {
  return config;
};

const responseMapper = (response: any) => {
  return Promise.resolve(response);
};

const errorHandler = ({ response }: any) => {
  return Promise.reject(response?.data);
};

$axios.interceptors.request.use(setToken);
$axios.interceptors.request.use(requestMapper);
$axios.interceptors.response.use(responseMapper, errorHandler);

export default $axios;
