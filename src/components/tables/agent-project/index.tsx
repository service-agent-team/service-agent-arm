import { addKeyProp } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { Table } from '@/components';
import React, { useEffect } from 'react';
import { utils } from './utils';
import { IAgentProject } from '@/store/service-agent/project/types';

export const AgentProjectTable: React.FC = () => {
  const { getAllAgentProject } = useActions();
  const {
    agentProjects,
    loading: { get },
  } = useTypedSelector((state) => state.agentProject);

  useEffect(() => {
    getAllAgentProject({
      callback() {
        addNotification('successfully get all agent projects');
      },
    });
  }, []);

  const generateUserData = addKeyProp<IAgentProject>(agentProjects as IAgentProject[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? (generateUserData as IAgentProject[]) : []}
      loading={get}
      bordered
    />
  );
};
