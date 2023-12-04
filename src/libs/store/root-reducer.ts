import { ContractReducer } from './agent';
import { AuthReducer } from './auth/auth.slice';
import { UserReducer } from './users/user.slice';

export const reducer = {
  auth: AuthReducer,
  contract: ContractReducer,
  users: UserReducer,
};
