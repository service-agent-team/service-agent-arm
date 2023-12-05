import { removeLocalStorage, setLocalStorage } from '@/libs';
import Cookies from 'js-cookie';

export const saveTokensCookie = (data: any) => {
  Cookies.set('accessToken', data.access_token);
  Cookies.set('refreshToken', data.access_token);
};

export const saveStorage = (data: any) => {
  saveTokensCookie(data);
  setLocalStorage('user', data.data);
};

export const removeTokensCookie = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export const clearStorage = () => {
  removeTokensCookie();
  removeLocalStorage('user');
};

export const getTokens = () => {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');

  return { accessToken, refreshToken };
};
