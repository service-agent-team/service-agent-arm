export const createQueryString = (params: any = {}) => {
  const urlParts: string[] = [];

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      urlParts.push(`${key}=${value.join(',')}`);
    } else if (value !== undefined && value !== null) {
      urlParts.push(`${key}=${value}`);
    }
  });

  const queryString = urlParts.length > 0 ? `?${urlParts.join('&')}` : '';

  return queryString;
};
