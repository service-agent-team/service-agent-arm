import { appReducer } from '../app';
import { AuthReducer } from '../auth/slice';
import { CarTypeReducer } from '../car-type/slice';
import { DriverReducer } from '../driver/slice';
import { PermissionReducer } from '../permission/slice';
import { TariffReducer } from '../tariff/slice';
import { UserReducer } from '../users/slice';
import { AgentContractReducer } from './../agent';

export const reducer = {
  app: appReducer,
  auth: AuthReducer,
  user: UserReducer,
  users: UserReducer,
  agent: AgentContractReducer,
  permission: PermissionReducer,
  tariff: TariffReducer,
  carType: CarTypeReducer,
  driver: DriverReducer,
};
