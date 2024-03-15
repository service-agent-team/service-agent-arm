import { Table } from 'antd';
import { utils } from './utils';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addKeyProp, addNotification } from '@/common';
import { IAgentUserRoles } from '@/store/service-agent/user-role/types';

export const AgentUserRoleTable = () => {
  const { getAllAgentUserRole } = useActions();
  const {
    agentUserRoles,
    loading: { get },
  } = useTypedSelector((state) => state.agentUserRole);

  useEffect(() => {
    getAllAgentUserRole({
      callback() {
        addNotification('successfully get all user roles');
      },
    });
  }, []);
  const generateUserData = addKeyProp<IAgentUserRoles>(agentUserRoles as IAgentUserRoles[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? (agentUserRoles as IAgentUserRoles[]) : []}
      loading={get}
      bordered
    />
  );
};
