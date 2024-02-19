import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AgentOrderService } from '@/services/agent';
import { AxiosResponse } from 'axios';
import { IAgentOrderPay, IAgentOrderData } from './types';

export const getAgentOrders = createAsyncThunk<
  AxiosResponse<any, IAgentOrderData[]>,
  IAgentOrderPay
>('get/orders/agent', async ({ start, end, status }, thunkApi) => {
  try {
    const response = await AgentOrderService.getAllOrders(start, end, status);

    return response;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
