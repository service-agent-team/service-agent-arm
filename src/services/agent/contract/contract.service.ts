import { $axios } from '@/common/config';
import { IUserResponse } from '@/store/service-agent/contract/contract.interface';
import { IParam } from './types';
import { EndPointesV2 } from '@/services/endpoints-v2';
const { agent } = EndPointesV2;

export const ContractService = {
  async getAllUsers(statusName: string, pageNumber = 0, pageSize = 10) {
    const response = await $axios.get<IUserResponse>(
      agent.contract.getAllUsers +
        `?status=${statusName}&pageNumber=${pageNumber}&pageSize=${pageSize}`,
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
