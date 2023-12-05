import { AxiosError } from 'axios';

export const LANG = 'lang';
const PREFIX = '/';

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

export const getPrefix = (name: string, action: string) => `${name}${PREFIX}${action}`;

export const makeErrMsg = (error: any | AxiosError) => {
  const { message: responseError } = error.response.data;

  if (responseError.errMsg instanceof Array) {
    return responseError.errMsg[0];
  } else {
    if (!error.response.data) {
      return error.message;
    }

    if (error.response?.data) {
      return error.response.data.message;
    }
  }

  return responseError.errMsg;
};

export const passwordRegex = new RegExp(/^(?=.*[0-9])[a-zA-Z0-9][a-zA-Z0-9!@#$%^&*.,_-]{6,17}$/);
