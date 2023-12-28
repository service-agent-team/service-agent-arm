import { appActions } from '../app/slice';
import * as AuthActions from '../auth/actions';
import * as PermissionActions from '../permission/actions';
import { PermissionSliceActions } from '../permission/slice';
import * as UserActions from '../users/actions';
import { UserSliceActions } from '../users/slice';
import { AgentContractActions, ContractSliceActions } from './../agent';
import { AuthSliceActions } from './../auth/slice';

export const AllActions = {
  ...appActions,
  ...AuthSliceActions,
  ...AuthActions,
  ...UserSliceActions,
  ...UserActions,
  ...UserActions,
  ...UserSliceActions,
  ...ContractSliceActions,
  ...AgentContractActions,
  ...PermissionActions,
  ...PermissionSliceActions,
};
