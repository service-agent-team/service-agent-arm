import { configureStore } from '@reduxjs/toolkit';
import { reducer } from './root';
import { navigateBasedOnRole } from '@/middlewares';

export const store = configureStore({
  reducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(navigateBasedOnRole),
});

export * from './store-interfaces';
