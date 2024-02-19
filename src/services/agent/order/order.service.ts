import { $axios } from '@/config';
import { EndPointes } from '../../endpoints';
const { agent } = EndPointes;

export const AgentOrderService = {
  async getAllOrders(start: string, end: string, status: number) {
    const response = await $axios.get(
      `${agent.getAllOrder}?startDate=${start}&entDate=${end}&status=${status}`,
    );
    return response;
  },
};
