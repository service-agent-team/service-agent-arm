import { $axios } from '@/common/config';
import { EndPointes } from '../../endpoints';
const { agent } = EndPointes;

export const AgentStatistcService = {
  async getAllOrders(start: string, end: string) {
    const response = await $axios.get(
      `${agent.getAllOrderStatistic}?startDate=${start}&entDate=${end}`,
    );
    return response;
  },
};
