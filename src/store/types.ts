import { Action, ThunkAction } from '@reduxjs/toolkit';
import { RootState } from '.';

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
