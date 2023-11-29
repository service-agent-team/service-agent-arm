import { $axios } from '@/config';
import { AxiosResponse } from 'axios';
import { EndPointes } from '../../endpoints';
import { IUserResponse } from '@/libs/store/agent/contract/contract.interface';
const { agent } = EndPointes;

export const ContractService = {
  async getAllUsers() {
    const response = await $axios.get<AxiosResponse<IUserResponse>>(agent.contract.getAllUsers);
    return response;
  },
};
