import { appReducer } from '../app';
import { AuthReducer } from '../global/auth/slice';
import { PermissionReducer } from '../global/permission/slice';
import { UserReducer } from '../global/users/slice';
import { CarModelReducer } from '../lets-trip/car-model/slice';
import { CarTypeReducer } from '../lets-trip/car-type/slice';
import { CarReducer } from '../lets-trip/car/slice';
import { CompanyReducer } from '../service-agent/company/slice';
import { AgentContractReducer } from '../service-agent/contract/contract.slice';
import { AgentOrderReducer } from '../service-agent/order/slices';
import { AgentPermissionReducer } from '../service-agent/permission/slice';
import { ProductReducer } from '../service-agent/product/slice';
import { AgentRolesPermissionReducer } from '../service-agent/role-permission/slice';
import { RolesReducer } from '../service-agent/roles/slice';
import { AgentStatisticReducer } from '../service-agent/statistic/slice';
import { AgentTariffReducer } from '../service-agent/tariff/tariff.slice';
import { AgentUserRoleReducer } from '../service-agent/user-role/slice';
import { AgentUserPermissionReducer } from '../service-agent/user-permission/slice';
import { LetsTripOrderReduce } from '../lets-trip/order/slice';
import { ProjectReducer } from '../global/project/slice';
import { AgentProjectReducer } from '../service-agent/project/slice';
import { UserRoleReducer } from '../global/user-role/slice';
import { RoleReducer } from '../global/role/slice';
import { UserPermissionReducer } from '../global/user-permission/slice';
import { LetsTripTourReduce } from '../lets-trip/tour/slice';
import { LetsTripTransferReduce } from '../lets-trip/transfer/slice';
import { LetsTripCountryReduce } from '../lets-trip/country/slice';

export const reducer = {
  app: appReducer,
  auth: AuthReducer,
  user: UserReducer,
  users: UserReducer,
  agent: AgentContractReducer,
  permission: PermissionReducer,
  company: CompanyReducer,
  product: ProductReducer,
  project: ProjectReducer,
  role: RoleReducer,
  userRole: UserRoleReducer,
  userPermission: UserPermissionReducer,
  carType: CarTypeReducer,
  agentTariff: AgentTariffReducer,
  car: CarReducer,
  carModel: CarModelReducer,
  roles: RolesReducer,
  agentRolesPermission: AgentRolesPermissionReducer,
  agentPermission: AgentPermissionReducer,
  agentOrder: AgentOrderReducer,
  agentStatistic: AgentStatisticReducer,
  agentUserRole: AgentUserRoleReducer,
  agentUserPermission: AgentUserPermissionReducer,
  agentProject: AgentProjectReducer,
  letsTripOrder: LetsTripOrderReduce,
  letsTripTour: LetsTripTourReduce,
  letsTripTransfer: LetsTripTransferReduce,
  letsTripCountry: LetsTripCountryReduce,
};
