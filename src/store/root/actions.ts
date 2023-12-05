import * as ContractAction from '../agent/contract/contract.action';
import { ContractSliceActions } from '../agent/contract/contract.slice';
<<<<<<< HEAD
import * as AuthActions from '../auth/actions';
import { AuthSliceActions } from '../auth/slice';
=======
import { appActions } from '../app';
import * as AuthActions from '../auth/auth.actions';
import { AuthSliceActions } from '../auth/auth.slice';
>>>>>>> 9cc14a7cc27f2b4ccb4e41492ddd1e7514a7f178
import * as UserActions from '../users/user.actions';
import { UserSliceActions } from '../users/user.slice';

export const AllActions = {
<<<<<<< HEAD
=======
  ...appActions,
>>>>>>> 9cc14a7cc27f2b4ccb4e41492ddd1e7514a7f178
  ...AuthSliceActions,
  ...AuthActions,
  ...ContractSliceActions,
  ...ContractAction,
  ...UserActions,
  ...UserSliceActions,
};
