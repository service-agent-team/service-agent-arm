import { $axios } from '@/config';
import { IUserResponse } from '@/store/agent/contract/contract.interface';
import { EndPointes } from '../../endpoints';
const { agent } = EndPointes;

export const ContractService = {
  async getAllUsers() {
    const response = await $axios.get<IUserResponse>(agent.contract.getAllUsers);
    return response;
  },
};
