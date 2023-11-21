// import { IAuthResponse } from '@/store/auth/auth.interface';
import Cookies from 'js-cookie';

export const saveTokensCookie = (data: any) => {
  Cookies.set('accessToken', data.accessToken);
  Cookies.set('refreshToken', data.refreshToken);
};

export const saveStorage = (data: any) => {
  saveTokensCookie(data);
  localStorage.setItem('user', JSON.stringify(data.data));
};

export const removeTokensCookie = () => {
  Cookies.remove('accessToken');
  Cookies.remove('refreshToken');
};

export const cliearStorage = () => {
  removeTokensCookie();
  localStorage.removeItem('user');
};

export const getFromLocalstorage = (key: string) => {
  return localStorage.getItem(key);
};

export const getTokens = () => {
  const accessToken = Cookies.get('accessToken');
  const refreshToken = Cookies.get('refreshToken');

  return { accessToken, refreshToken };
};
