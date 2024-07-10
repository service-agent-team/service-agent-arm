import { $axios } from '@/common/config';
import { EndPointesV2 } from '@/services/endpoints-v2';
const { agent } = EndPointesV2;

export const AgentPermissionsService = {
  // role permission
  async updateRolePermission(userId: number, roleId: number, permissionIds: number[]) {
    return await $axios.post(`${agent.contract.updatePermissionToUserRole}`, {
      userId,
      roleId,
      permissionIds,
    });
  },
  async agentAddRolePermission(userId: number, roleId: number, permissionId: number) {
    return await $axios.post(`${agent.contract.addPermissionToUser}`, {
      userId,
      roleId,
      permissionId,
    });
  },
  async agentAddRole(userId: number, roleId: number) {
    return await $axios.post(`${agent.contract.addRoleToUser}`, { userId, roleId });
  },
  async agentRemoveRoleFromUser(userId: number, roleId: number) {
    return await $axios.post(`${agent.contract.removeRoleFromUser}`, { userId, roleId });
  },
  async agentRemovePermissionFromUserRole(userId: number, roleId: number, permissionId: number) {
    return await $axios.post(`${agent.contract.removePermissionFromUserRole}`, {
      userId,
      roleId,
      permissionId,
    });
  },

  // project permission
  async updateProjectPermission(userId: number, projectId: number, permissionIds: number[]) {
    return await $axios.post(`${agent.contract.updatePermissionToUserProject}`, {
      userId,
      projectId,
      permissionIds,
    });
  },
  async addProjectToUser(userId: number, projectId: number) {
    return await $axios.post(`${agent.contract.addProjectToUser}`, {
      userId,
      projectId,
    });
  },
  async addPermissionToUserProject(userId: number, projectId: number, permissionId: number) {
    return await $axios.post(`${agent.contract.addPermissionToUserProject}`, {
      userId,
      projectId,
      permissionId,
    });
  },
  async removeProjectFromUser(userId: number, projectId: number) {
    return await $axios.post(`${agent.contract.removeProjectFromUser}`, {
      userId,
      projectId,
    });
  },
  async removePermissionFromToUserProject(userId: number, projectId: number, permissionId: number) {
    return await $axios.post(`${agent.contract.removePermissionFromUserProject}`, {
      userId,
      projectId,
      permissionId,
    });
  },

  //tariff permission
  async updateTariffPermission(userId: number, tariffId: number, permissionIds: number[]) {
    return await $axios.post(`${agent.contract.updatePermissionToUserTariff}`, {
      userId,
      tariffId,
      permissionIds,
    });
  },
};
