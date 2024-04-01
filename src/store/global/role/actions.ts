import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { IRolePayload, IRoleResponse } from './types';
import { EndPointes } from '@/services/endpoints';
import { RoleService } from '@/services';

export const getAllRole = createAsyncThunk<IRoleResponse, IRolePayload>(
  EndPointes.role.getAll,
  async ({ callback }, thunkApi) => {
    try {
      const response = await RoleService.getAllRole();
      if (response.status === 200) {
        callback();
      }
      return response.data;
    } catch (error) {
      addNotification(error);
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

// export const createUserRole = createAsyncThunk<IUserRoleCreateResponse, IUserRoleCreatePayload>(
//   EndPointes.userRole.create,
//   async ({ callback, ...body }, thunkApi) => {
//     try {
//       const response = await UserRoleService.createUserRole(body);
//       if (response.status == 201) {
//         callback();
//       }
//       return response.data;
//     } catch (error) {
//       addNotification(error);
//       return thunkApi.rejectWithValue({ error: errorCatch(error) });
//     }
//   },
// );
