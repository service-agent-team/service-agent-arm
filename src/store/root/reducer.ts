import { appReducer } from '../app';
import { AuthReducer } from '../auth/slice';
import { PermissionReducer } from '../permission/slice';
import { TariffReducer } from '../tariff/slice';
import { UserReducer } from '../users/slice';
import { AgentContractReducer } from './../agent';
import { ProductReducer } from '../product/slice';
export const reducer = {
  app: appReducer,
  auth: AuthReducer,
  user: UserReducer,
  users: UserReducer,
  agent: AgentContractReducer,
  permission: PermissionReducer,
  tariff: TariffReducer,
  product: ProductReducer,
};
