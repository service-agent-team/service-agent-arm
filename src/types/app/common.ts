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
  put = 'put',
  delete = 'delete',
}

export interface IStoreLoadings {
  get: string;
  post: string;
  put: string;
  delete: string;
}

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
