<<<<<<< HEAD
import { SignIn } from '@/store/auth/actions';
=======
import { SignIn } from '@/store/auth/auth.actions';
>>>>>>> 9cc14a7cc27f2b4ccb4e41492ddd1e7514a7f178
import { Dispatch, MiddlewareAPI } from '@reduxjs/toolkit';

export const navigateBasedOnRole = (_: MiddlewareAPI) => (next: Dispatch) => (action: any) => {
  const role = action.payload?.data?.role;

  if (action.type == SignIn.fulfilled.type) {
    switch (role) {
      case 'superadmin':
        // history.push('/dashboard');
        break;
      case 'user':
        // history.push('/agent');
        break;
      // Add more cases for other roles
      default:
        break;
    }
  }

  return next(action);
};
