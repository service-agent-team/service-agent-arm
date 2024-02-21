import { $axios } from '@/common/config';
import { IUserResponse } from '@/store/agent/contract/contract.interface';
import { EndPointes } from '../../endpoints';
import { IParam } from './types';
const { agent } = EndPointes;

export const ContractService = {
  async getAllUsers(statusName: string) {
    const response = await $axios.get<IUserResponse>(
      agent.contract.getAllUsers + `?status=${statusName}`,
    );
    return response;
  },

  async acceptAgent({ companyId, userId, currency }: IParam) {
    const response = await $axios.put(`${agent.contract.accept}/${userId}`, {
      companyId,
      currency,
    });
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
