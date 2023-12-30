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

  async acceptAgent(userId: number) {
    const response = await $axios.put(`${agent.contract.accept}/${userId}`);
    return response;
  },

  async rejectAgent(userId: number) {
    const response = await $axios.put(`${agent.contract.reject}/${userId}`);
    return response;
  },

  async getOneAgent(userId: number) {
    const response = await $axios.get(`${agent.contract.getOne}/${userId}`);
    return response;
  },
};
