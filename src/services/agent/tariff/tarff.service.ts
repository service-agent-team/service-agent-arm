import { $axios } from '@/common/config';
import { IAgentTariffResponse, ITariffCreatePayload } from '@/store/service-agent/tariff/types';
import { EndPointes } from '../../endpoints';
const { agent } = EndPointes;

export const TariffService = {
  async getAllCategory() {
    const response = await $axios.get<IAgentTariffResponse>(agent.tariff.getAll);
    return response;
  },
  async createTariff(body: ITariffCreatePayload) {
    const response = await $axios.post(agent.tariff.create, body);
    return response;
  },

  async deleteTariff(id: number | string) {
    const response = await $axios.post(agent.tariff.delete + id);
    return response;
  },
};
