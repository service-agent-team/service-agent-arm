import { RcFile } from 'antd/es/upload';
import { AxiosError } from 'axios';

export const LANG = 'lang';
const PREFIX = '/';
export const API_URL = (import.meta.env.APP_API_URL as string) || 'https://admin.devnugget.uz/api/';
export const IMAGE_URL = `${API_URL}uploads/`;

export const ACCESS_TOKEN = 'access-token';
export const USER = 'user';
export const THEME = 'theme';

export const getRoute = (...routes: Array<string>) => {
  let route = '';

  for (let i = 0; i < routes.length; i++) {
    if (routes[i].startsWith('/')) {
      route += routes[i];
    } else {
      route += `/${routes[i]}`;
    }
  }

  return route;
};

export const getBase64 = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export const getPrefix = (name: string, action: string) => `${name}${PREFIX}${action}`;

export const makeErrMsg = (error: any | AxiosError) => {
  const { message: responseError } = error.response.data;

  if (responseError.message instanceof Array) {
    return responseError.message[0];
  } else {
    if (!error.response.data) {
      return error.message;
    }

    if (error.response?.data) {
      return error.response.data.message;
    }
  }

  return responseError.errors;
};

export const passwordRegex = new RegExp(/^(?=.*[0-9])[a-zA-Z0-9][a-zA-Z0-9!@#$%^&*.,_-]{6,17}$/);

export function addKeyProp<T>(data: T[]) {
  const arr = data?.map((item, i) => {
    return { key: i, ...item };
  });

  return arr;
}

export const normalizeProp = (prop: string | number | [number, number]): string =>
  typeof prop === 'number'
    ? `${prop}px`
    : (Array.isArray(prop) && `${prop[0]}px ${prop[1]}px`) || prop.toString();

export const getImgUrl = (url: string) => `${IMAGE_URL}${url}`;
