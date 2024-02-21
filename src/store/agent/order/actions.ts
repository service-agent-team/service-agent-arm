import { errorCatch } from '@/common/helpers';
import { addNotification } from '@/common/utils/addNotification';
import { AgentOrderService } from '@/services/agent';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';
import { IAgentOrderData, IAgentOrderPay } from './types';

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
