import { appReducer } from '../app';
import { AuthReducer } from '../auth/slice';

export const reducer = {
  app: appReducer,
  auth: AuthReducer,
};
