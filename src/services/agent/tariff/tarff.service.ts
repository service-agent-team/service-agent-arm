import { EndPointesV2 } from '@/services/endpoints-v2';
import { $axios } from '@/common/config';
const { agent } = EndPointesV2;

export const TariffService = {
  async getAllTariffCategory() {
    const response = await $axios.get(agent.tariff.getAll);
    return response;
  },
  async getAllCategory(pageNumber = 0, pageSize = 10) {
    const response = await $axios.get(
      `${agent.category.getAll}?pageNumber=${pageNumber}&pageSize=${pageSize}`,
    );
    return response;
  },
  async getOneTariffCategory(id: string) {
    const response = await $axios.get(agent.tariff.getOne + id);
    return response;
  },
  async createTariffCategory(body: any) {
    const response = await $axios.post(agent.tariff.create, body);
    return response;
  },
  async updateTariffCategory(id: string, body: any) {
    const response = await $axios.put(agent.tariff.update + id, body);
    return response;
  },
  async deleteTariffCategory(id: number | string) {
    const response = await $axios.delete(agent.tariff.delete + id);
    return response;
  },
};
