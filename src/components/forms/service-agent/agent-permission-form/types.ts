import { IAgentPermissionType } from '@/store/service-agent/permission/types';

export interface IAgentPermissionValues {
  name: string;
  description: string;
  type: IAgentPermissionType;
}
