import { addKeyProp } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Table } from '@/components';
import React, { useEffect } from 'react';
import { utils } from './utils';
import { IAgentProjectV2 } from '@/store/service-agent/project/types';

export const AgentProjectTable: React.FC = () => {
  const { getAllAgentProject } = useActions();
  const {
    agentProjects,
    loading: { get, post },
  } = useTypedSelector((state) => state.agentProject);

  useEffect(() => {
    getAllAgentProject({
      callback() {},
      pageNumber: 0,
      pageSize: 20,
    });
  }, []);

  const generateUserData = addKeyProp<IAgentProjectV2>(agentProjects as IAgentProjectV2[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? (generateUserData as IAgentProjectV2[]) : []}
      loading={get || post}
      bordered
    />
  );
};
