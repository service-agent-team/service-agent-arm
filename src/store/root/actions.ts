import { appActions } from '../app/slice';
import * as AuthActions from '../auth/actions';
import * as CarTypeActions from '../car-type/actions';
import { CarTypesliceActions } from '../car-type/slice';
import * as CarActions from '../car/actions';
import { CarSliceActions } from '../car/slice';
import * as DriverActions from '../driver/actions';
import { DriverSliceActions } from '../driver/slice';
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
import { AuthSliceActions } from './../auth/slice';
import * as ProductActions from './../product/action';

import * as CarModelActions from './../car-model/action';
import { CarModelsliceActions } from './../car-model/slice';
import * as OrderActions from './../order/action';
import { OrderSliceActions } from './../order/slice';
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
  ...CarTypeActions,
  ...CarTypesliceActions,
  ...DriverActions,
  ...DriverSliceActions,
  ...AgentTariffSliceActions,
  ...AgentTariffAction,
  ...CarModelsliceActions,
  ...CarModelActions,
  ...OrderSliceActions,
  ...OrderActions,
};
