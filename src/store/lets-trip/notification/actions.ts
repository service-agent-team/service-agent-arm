import { errorCatch } from '@/common';
import { NotificationService } from '@/services';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import {
  ILetstripUsers,
  IMultiTemplateSendMessagePayload,
  INotificationTemplate,
  ISendMessageResponse,
} from './type';
import { EndPointes } from '@/services/endpoints';

export const getLetstripUsers = createAsyncThunk<ILetstripUsers[], any>(
  'letstrip/users',
  async ({ search }, thunkApi) => {
    try {
      const response = await NotificationService.getLetstripUsers(search);
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const getAllNotificationTemplates = createAsyncThunk<INotificationTemplate[], any>(
  EndPointes.letstripNotification.getAllTemplates,
  async (_, thunkApi) => {
    try {
      const response = await NotificationService.getAllTemplates();
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const sendNotification = createAsyncThunk<AxiosResponse<ILetstripUsers[]>, any>(
  EndPointes.letstripNotification.sendNotification,
  async ({ userIds, title, body, attributes, cb }, thunkApi) => {
    try {
      const response = await NotificationService.sendNotification({
        userIds,
        title,
        body,
        attributes,
      });
      cb();
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);

export const sendMultiTemplateNotification = createAsyncThunk<
  ISendMessageResponse,
  IMultiTemplateSendMessagePayload
>(
  EndPointes.letstripNotification.sendMultiTemplateNotification,
  async ({ userIds, templateId, templateData, languageCode, firebaseData, cb }, thunkApi) => {
    try {
      const response = await NotificationService.sendMultiTemplateNotification({
        userIds,
        templateId,
        languageCode,
        templateData,
        firebaseData,
      });

      if (response.status === 201) {
        cb();
      }

      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue({ error: errorCatch(error) });
    }
  },
);
