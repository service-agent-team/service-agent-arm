import { appActions } from '../app/slice';
import * as AuthActions from '../global/auth/actions';
import { AuthSliceActions } from '../global/auth/slice';
import * as PermissionActions from '../global/permission/actions';
import { PermissionSliceActions } from '../global/permission/slice';
import * as UserActions from '../global/users/actions';
import { UserSliceActions } from '../global/users/slice';
import * as CarModelActions from '../lets-trip/car-model/action';
import { CarModelsliceActions } from '../lets-trip/car-model/slice';
import * as CarTypeActions from '../lets-trip/car-type/actions';
import { CarTypesliceActions } from '../lets-trip/car-type/slice';
import * as CarActions from '../lets-trip/car/actions';
import { CarSliceActions } from '../lets-trip/car/slice';
import * as CompanyAction from '../service-agent/company/actions';
import { CompanySliceActions } from '../service-agent/company/slice';
import * as ContractSlices from '../service-agent/contract/contract.action';
import { ContractSliceActions } from '../service-agent/contract/contract.slice';
import * as AgentOrdersActions from '../service-agent/order/actions';
import { AgentOrderSliceActions } from '../service-agent/order/slices';
import * as AgentPermissionActions from '../service-agent/permission/action';
import { AgentPermissionSliceActions } from '../service-agent/permission/slice';
import * as ProductActions from '../service-agent/product/action';
import { ProductSliceActions } from '../service-agent/product/slice';
import * as AgentRolesPermissionActions from '../service-agent/role-permission/actions';
import { AgentRolesPermissionSliceActions } from '../service-agent/role-permission/slice';
import * as RolesSlice from '../service-agent/roles/action';
import { RolesSliceActions } from '../service-agent/roles/slice';
import * as AgentStatisticActions from '../service-agent/statistic/actions';
import { AgentStatisticSliceActions } from '../service-agent/statistic/slice';
import * as AgentTariffActions from '../service-agent/tariff/tariff.action';
import * as TariffActions from '../service-agent/tariff/tariff.action';
import { AgentTariffSliceActions } from '../service-agent/tariff/tariff.slice';
import * as TariffPermissionActions from '../service-agent/tariffPermission/permission.action';
import { AgentTariffPermissionSliceActions } from '../service-agent/tariffPermission/permission.slice';
import * as AgentUserRoleActions from '../service-agent/user-role/action';
import { AgentUserRoleSliceActions } from '../service-agent/user-role/slice';
import * as AgentUserPermissionActions from '../service-agent/user-permission/action';
import { AgentUserPermissionSliceActions } from '../service-agent/user-permission/slice';
import * as LetsTripOrderActions from '../lets-trip/order/actions';
import { LetsTripOrderSliceActions } from '../lets-trip/order/slice';
import * as ProjectActions from '../global/project/actions';
import { ProjectSliceActions } from '../global/project/slice';
import * as AgentProjectActions from '../service-agent/project/actions';
import { AgentProjectSliceActions } from '../service-agent/project/slice';

export const AllActions = {
  ...AgentTariffActions,
  ...AgentTariffSliceActions,
  ...ContractSlices,
  ...ContractSliceActions,
  ...CarActions,
  ...CarSliceActions,
  ...appActions,
  ...AuthSliceActions,
  ...AuthActions,
  ...UserSliceActions,
  ...UserActions,
  ...UserActions,
  ...PermissionActions,
  ...PermissionSliceActions,
  ...TariffActions,
  ...ProductActions,
  ...ProductSliceActions,
  ...CarTypeActions,
  ...CarTypesliceActions,
  ...CarModelsliceActions,
  ...CarModelActions,
  ...RolesSlice,
  ...RolesSliceActions,
  ...CompanySliceActions,
  ...CompanyAction,
  ...AgentTariffPermissionSliceActions,
  ...TariffPermissionActions,
  ...AgentRolesPermissionSliceActions,
  ...AgentRolesPermissionActions,
  ...AgentPermissionSliceActions,
  ...AgentPermissionActions,
  ...AgentOrderSliceActions,
  ...AgentOrdersActions,
  ...AgentStatisticSliceActions,
  ...AgentStatisticActions,
  ...AgentUserRoleSliceActions,
  ...AgentUserRoleActions,
  ...LetsTripOrderSliceActions,
  ...LetsTripOrderActions,
  ...AgentUserPermissionActions,
  ...AgentUserPermissionSliceActions,
  ...ProjectSliceActions,
  ...ProjectActions,
  ...AgentProjectActions,
  ...AgentProjectSliceActions,
};
