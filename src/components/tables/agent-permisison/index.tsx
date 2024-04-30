import { addKeyProp } from '@/common';
import { useTypedSelector } from '@/common/hooks';
import { Table } from '@/components';
import { IAgentPermissionV2 } from '@/store/service-agent/permission/types';
import React from 'react';
import { utils } from './utils';

export const AgentPermissionTable: React.FC = () => {
  const {
    permissions,
    loading: { get },
  } = useTypedSelector((state) => state.agentPermission);
  const generateUserData = addKeyProp<IAgentPermissionV2>(permissions as IAgentPermissionV2[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? (generateUserData as IAgentPermissionV2[]) : []}
      loading={get}
      bordered
    />
  );
};
