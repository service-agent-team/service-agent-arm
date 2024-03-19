import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common';
import { IAgentUserPermission } from '@/store/service-agent/user-permission/types';

export const AgentUserPermissionTable = () => {
  const { getAllAgentUserPermission } = useActions();
  const { loading, agentUserPermissions } = useTypedSelector((state) => state.agentUserPermission);

  useEffect(() => {
    getAllAgentUserPermission({
      callback() {
        addNotification('get all agent user permission');
      },
    });
  }, []);

  return (
    <Table
      columns={utils()}
      dataSource={agentUserPermissions ? (agentUserPermissions as IAgentUserPermission[]) : []}
      loading={loading.get}
      bordered
    />
  );
};
