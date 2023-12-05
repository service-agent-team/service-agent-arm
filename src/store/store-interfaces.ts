import { Action, ThunkAction } from '@reduxjs/toolkit';
import { store } from './store';

export interface IStoreLoadings {
  get: string;
  post: string;
  put: string;
  delete: string;
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
