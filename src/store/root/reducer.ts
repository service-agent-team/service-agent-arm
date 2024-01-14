import { appReducer } from '../app';
import { AuthReducer } from '../auth/slice';
import { CarTypeReducer } from '../car-type/slice';
import { DriverReducer } from '../driver/slice';
import { PermissionReducer } from '../permission/slice';
import { TariffReducer } from '../tariff/slice';
import { UserReducer } from '../users/slice';
import { AgentContractReducer, agentTariffReducer } from './../agent';
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
  carType: CarTypeReducer,
  driver: DriverReducer,
  agentTariff: agentTariffReducer,
};
