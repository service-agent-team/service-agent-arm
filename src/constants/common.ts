import { IStoreLoadings } from '@/types/app/common';

export const API_URL = import.meta.env.APP_API_URL as string;

export const loadings: IStoreLoadings = {
  get: 'get',
  post: 'post',
  put: 'put',
  delete: 'delete',
};
