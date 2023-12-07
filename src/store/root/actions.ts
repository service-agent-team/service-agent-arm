import { appActions } from '../app/slice';
import * as AuthActions from '../auth/actions';
import { AuthSliceActions } from './../auth/slice';

export const AllActions = {
  ...appActions,
  ...AuthSliceActions,
  // ...AuthActions,
};
