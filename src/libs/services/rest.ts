import axios, { AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { API_URL } from '@/constants';
import { getLocalStorage, ACCESS_TOKEN } from '../utils';

export const rest = axios.create({ baseURL: API_URL, timeout: 65000 });

const setToken = (config: InternalAxiosRequestConfig) => {
  if (!config?.headers?.authorization) {
    const token = getLocalStorage(ACCESS_TOKEN);

    if (token && config.headers) {
      config.headers.authorization = `Bearer ${token}`;
    }
  }

  return config;
};

const requestMapper = (config: InternalAxiosRequestConfig) => {
  return config;
};

const responseMapper = (response: AxiosResponse): Promise<AxiosResponse> => {
  return Promise.resolve(response.data);
};

const errorHandler = (error: AxiosError): Promise<never> => {
  if (error.response?.status === 401) {
    // logout();
  }

  return Promise.reject(error?.response?.data);
};

rest.interceptors.request.use(setToken);
rest.interceptors.request.use(requestMapper);
rest.interceptors.response.use(responseMapper, errorHandler);
