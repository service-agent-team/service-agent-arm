import * as AuthActions from './auth/auth.actions';
import { AuthSliceActions } from './auth/auth.slice';

export const AllActions = { ...AuthSliceActions, ...AuthActions };
