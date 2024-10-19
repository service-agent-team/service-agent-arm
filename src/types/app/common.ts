import { RootState } from '@/store';
import { Action, ThunkAction } from '@reduxjs/toolkit';

export type TUploadFileResponse = {
  images: string[];
  id: number;
  createdAt: string;
};

export enum PayloadEnum {
  get = 'get',
  post = 'post',
  patch = 'patch',
  put = 'put',
  delete = 'delete',
}

export interface IStoreLoadings {
  get: boolean;
  post: boolean;
  patch: boolean;
  put: boolean;
  delete: boolean;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
