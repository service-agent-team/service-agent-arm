import { appReducer } from '../app';
import { AuthReducer } from '../auth/slice';
import { UserReducer } from '../users/slice';
import { AgentContractReducer } from './../agent';

export const reducer = {
  app: appReducer,
  auth: AuthReducer,
  user: UserReducer,
  users: UserReducer,
  agent: AgentContractReducer,
};
