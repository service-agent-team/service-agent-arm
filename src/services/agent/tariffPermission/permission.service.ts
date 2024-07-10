import { $axios } from '@/common/config';
import { EndPointes } from '../../endpoints';
const { agent } = EndPointes;
// export { IParam } from './types';

export interface IParam {
  tariffId: number;
  userId: number;
  permissionId?: number;
}
export const TariffPermissionService = {
  async addTariffToUser(body: IParam) {
    const response = await $axios.post(agent.tariffPer.addTariffToUser, body);
    return response;
  },
  async addPermissionToUserTariff(body: IParam) {
    const response = await $axios.post(agent.tariffPer.addPermissionToUserTariff, body);
    return response;
  },
  async removeTariffFromUser(body: IParam) {
    const response = await $axios.post(agent.tariffPer.removeTariffFromUser, body);
    return response;
  },
  async removePermissionFromUserTariff(body: IParam) {
    const response = await $axios.post(agent.tariffPer.removePermissionFromUserTariff, body);
    return response;
  },
};
