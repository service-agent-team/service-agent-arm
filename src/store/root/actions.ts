import { appActions } from '../app/slice';
import * as AuthActions from '../auth/actions';
import { AuthSliceActions } from './../auth/slice';
import { UserSliceActions } from './../users/slice';
import * as UserActions from './../users/actions';

export const AllActions = {
  ...appActions,
  ...AuthSliceActions,
  ...AuthActions,
  ...UserSliceActions,
  ...UserActions,
};
