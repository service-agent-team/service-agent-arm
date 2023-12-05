import { ContractReducer } from '../agent';
import { appReducer } from '../app';
import { AuthReducer } from '../auth/auth.slice';
import { UserReducer } from '../users/user.slice';

export const reducer = {
  app: appReducer,
  auth: AuthReducer,
  contract: ContractReducer,
  users: UserReducer,
};
