import { AgentPermissionReducer } from '../agent';
import { AgentOrderReducer } from '../agent/order/slices';
import { RolesReducer } from '../agent/roles/slice';
import { AgentStatisticReducer } from '../agent/statistic/slice';
import { appReducer } from '../app';
import { AuthReducer } from '../auth/slice';
import { CarModelReducer } from '../car-model/slice';
import { CarTypeReducer } from '../car-type/slice';
import { CarReducer } from '../car/slice';
import { CompanyReducer } from '../company/slice';
import { PermissionReducer } from '../permission/slice';
import { ProductReducer } from '../product/slice';
import { TariffReducer } from '../tariff/slice';
import { UserReducer } from '../users/slice';
import { AgentContractReducer, AgentTariffReducer } from './../agent';
import { AgentRolesPermissionReducer } from './../agent/role-permission/slice';
import { OrderReducer } from './../order/slice';

export const reducer = {
  app: appReducer,
  auth: AuthReducer,
  user: UserReducer,
  users: UserReducer,
  agent: AgentContractReducer,
  permission: PermissionReducer,
  tariff: TariffReducer,
  company: CompanyReducer,
  product: ProductReducer,
  carType: CarTypeReducer,
  agentTariff: AgentTariffReducer,
  car: CarReducer,
  carModel: CarModelReducer,
  tarnsferStatistika: OrderReducer,
  roles: RolesReducer,
  agentRolesPermission: AgentRolesPermissionReducer,
  agentPermission: AgentPermissionReducer,
  agentOrder: AgentOrderReducer,
  agentStatistic: AgentStatisticReducer,
};
