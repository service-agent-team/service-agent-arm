import { ContractReducer } from './agent';
import { AuthReducer } from './auth/auth.slice';

export const reducer = {
  auth: AuthReducer,
  contract: ContractReducer,
};
