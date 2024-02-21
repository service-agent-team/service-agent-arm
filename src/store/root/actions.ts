import * as AgentPermissionActions from '../agent/permission/action';
import * as RolesSlice from '../agent/roles/action';
import { RolesSliceActions } from '../agent/roles/slice';
import { appActions } from '../app/slice';
import * as AuthActions from '../auth/actions';
import * as CarTypeActions from '../car-type/actions';
import { CarTypesliceActions } from '../car-type/slice';
import * as CarActions from '../car/actions';
import { CarSliceActions } from '../car/slice';
import * as PermissionActions from '../permission/actions';
import { PermissionSliceActions } from '../permission/slice';
import * as TariffActions from '../tariff/actions';
import { TariffSliceActions } from '../tariff/slice';
import * as UserActions from '../users/actions';
import { UserSliceActions } from '../users/slice';
import {
  AgentContractActions,
  AgentTariffAction,
  AgentTariffSliceActions,
  ContractSliceActions,
} from './../agent';
import * as AgentOrdersActions from './../agent/order/actions';
import { AgentOrderSliceActions } from './../agent/order/slices';
import { AgentPermissionSliceActions } from './../agent/permission/slice';
import * as AgentRolesPermissionActions from './../agent/role-permission/actions';
import { AgentRolesPermissionSliceActions } from './../agent/role-permission/slice';
import * as AgentStatisticActions from './../agent/statistic/actions';
import { AgentStatisticSliceActions } from './../agent/statistic/slice';
import * as TariffPermissionActions from './../agent/tariffPermission/permission.action';
import { AgentTariffPermissionSliceActions } from './../agent/tariffPermission/permission.slice';
import { AuthSliceActions } from './../auth/slice';
import * as CarModelActions from './../car-model/action';
import { CarModelsliceActions } from './../car-model/slice';
import * as CompanyAction from './../company/actions';
import { CompanySliceActions } from './../company/slice';
import * as OrderActions from './../order/action';
import { OrderSliceActions } from './../order/slice';
import * as ProductActions from './../product/action';
import { ProductSliceActions } from './../product/slice';

export const AllActions = {
  ...CarActions,
  ...CarSliceActions,
  ...appActions,
  ...AuthSliceActions,
  ...AuthActions,
  ...UserSliceActions,
  ...UserActions,
  ...UserActions,
  ...ContractSliceActions,
  ...AgentContractActions,
  ...PermissionActions,
  ...PermissionSliceActions,
  ...TariffSliceActions,
  ...TariffActions,
  ...ProductActions,
  ...ProductSliceActions,
  ...CarTypeActions,
  ...CarTypesliceActions,
  ...AgentTariffSliceActions,
  ...AgentTariffAction,
  ...CarModelsliceActions,
  ...CarModelActions,
  ...OrderSliceActions,
  ...OrderActions,
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
};
