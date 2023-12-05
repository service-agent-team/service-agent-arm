import { ContractReducer } from '../agent';
<<<<<<< HEAD
import { AuthReducer } from '../auth/slice';
import { UserReducer } from '../users/user.slice';

export const reducer = {
=======
import { appReducer } from '../app';
import { AuthReducer } from '../auth/auth.slice';
import { UserReducer } from '../users/user.slice';

export const reducer = {
  app: appReducer,
>>>>>>> 9cc14a7cc27f2b4ccb4e41492ddd1e7514a7f178
  auth: AuthReducer,
  contract: ContractReducer,
  users: UserReducer,
};
