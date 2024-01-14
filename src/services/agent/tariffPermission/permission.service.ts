import { $axios } from '@/config';
import { EndPointes } from '../../endpoints';
const { agent } = EndPointes;

export const TariffPermissionService = {
  async addTariffPermission(body: any) {
    const response = await $axios.post(agent.tariffPer.add, body);
    return response;
  },
};
