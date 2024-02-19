import { errorCatch } from '@/helpers';
import { addNotification } from '@/libs/utils/addNotification';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AgentStatistcService } from '@/services/agent/statistica';
import { AxiosResponse } from 'axios';
import { IAgentOrderPay, IOrderStatistica } from './types';

export const getAgentOrdersStatis = createAsyncThunk<
  AxiosResponse<any, IOrderStatistica>,
  IAgentOrderPay
>('get/statistca/agent', async ({ start, end }, thunkApi) => {
  try {
    const response = await AgentStatistcService.getAllOrders(start, end);
    return response;
  } catch (error) {
    addNotification(error);
    return thunkApi.rejectWithValue({ error: errorCatch(error) });
  }
});
