import { appReducer } from '../app';
import { AuthReducer } from '../auth/slice';
import { UserReducer } from '../users/slice';

export const reducer = {
  app: appReducer,
  auth: AuthReducer,
  users: UserReducer,
};
