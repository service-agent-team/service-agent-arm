import { $axios } from '@/config';
import { IUserResponse } from '@/store/agent/contract/contract.interface';
import { EndPointes } from '../../endpoints';
const { agent } = EndPointes;

export const ContractService = {
  async getAllUsers(statusName: string) {
    const response = await $axios.get<IUserResponse>(
      agent.contract.getAllUsers + `?status=${statusName}`,
    );
    return response;
  },
};
