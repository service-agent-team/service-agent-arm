import { $axios } from '@/common/config';
import { EndPointes } from '../../endpoints';
import { ICreateParam, IDeleteParam, IUpdateParam } from './types';
const { userRoles } = EndPointes;

export const AgentUserRoleService = {
  async getAllAgentUserRole() {
    const response = await $axios.get(`${userRoles.getAll}`);
    return response;
  },
  async getOneAgentUserRole(id: number | string) {
    const response = await $axios.get(`${userRoles.getOne}${id}`);
    return response;
  },
  async createAgentUserRole(body: ICreateParam) {
    const response = await $axios.post(userRoles.create, body);
    return response;
  },
  async updateAgentUserRole(body: IUpdateParam) {
    const response = await $axios.patch(`${userRoles.edit}${body.id}`, body);
    return response;
  },
  async deleteAgentUserRole({ id }: IDeleteParam) {
    const response = await $axios.delete(`${userRoles.delete}${id}`);
    return response;
  },
};
