import { $axios } from '@/config';
import { IAgentTariffResponse } from '@/store/agent/tariff/types';
import { EndPointes } from '../../endpoints';
const { agent } = EndPointes;

export const TariffService = {
  async getAllCategory() {
    const response = await $axios.get<IAgentTariffResponse>(agent.tariff.getAll);
    return response;
  },

  // async addAgentCategory() {
  //   const responce = await $axios.post(agent.tariff);
  // },
};
