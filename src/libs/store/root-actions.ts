import * as AuthActions from './auth/auth.actions';
import { AuthSliceActions } from './auth/auth.slice';
import * as ContractAction from './agent/contract/contract.action';
import { ContractSliceActions } from './agent/contract/contract.slice';

export const AllActions = {
  ...AuthSliceActions,
  ...AuthActions,
  ...ContractSliceActions,
  ...ContractAction,
};
