export const LANG = 'lang';
const PREFIX = '/';

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
