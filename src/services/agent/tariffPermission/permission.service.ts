import { $axios } from '@/common/config';
import { EndPointes } from '../../endpoints';
const { agent } = EndPointes;
// export { IParam } from './types';

export interface IParam {
  userTariffId: number;
  userId: number;
  permissionId: number;
}
export const TariffPermissionService = {
  async addTariffPermission(body: IParam) {
    const response = await $axios.post(agent.tariffPer.add, body);
    return response;
  },
};
