import { errorCatch } from '@/common';
import { NotificationService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { ILetstripUsers } from './type';

export const getLetstripUsers = createAsyncThunk<ILetstripUsers[], any>(
  'letstrip/users',
  async ({ search }, thunkApi) => {
    try {
      const responce = await NotificationService.getLetstripUsers(search);
      return responce.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const sendNotification = createAsyncThunk<AxiosResponse<ILetstripUsers[]>, any>(
  'send/notification',
  async ({ userIds, title, body, attributes, cb }, thunkApi) => {
    try {
      const responce = await NotificationService.sendNotification({
        userIds,
        title,
        body,
        attributes,
      });
      cb();
      return responce.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
