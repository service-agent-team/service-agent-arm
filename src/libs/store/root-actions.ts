import * as ContractAction from './agent/contract/contract.action';
import { ContractSliceActions } from './agent/contract/contract.slice';
import * as AuthActions from './auth/auth.actions';
import { AuthSliceActions } from './auth/auth.slice';
import * as UserActions from './users/user.actions';
import { UserSliceActions } from './users/user.slice';

export const AllActions = {
  ...AuthSliceActions,
  ...AuthActions,
  ...ContractSliceActions,
  ...ContractAction,
  ...UserActions,
  ...UserSliceActions,
};
