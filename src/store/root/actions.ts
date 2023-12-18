import { appActions } from '../app/slice';
import * as AuthActions from '../auth/actions';
import * as UserActions from '../users/actions';
import { UserSliceActions } from '../users/slice';
import { AuthSliceActions } from './../auth/slice';

export const AllActions = {
  ...appActions,
  ...AuthSliceActions,
  ...AuthActions,
  ...UserSliceActions,
  ...UserActions,
  ...UserActions,
  ...UserSliceActions,
};
