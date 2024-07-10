import { addKeyProp } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Table } from '@/components';
import React, { useEffect } from 'react';
import { utils } from './utils';
import { IAgentProjectV2 } from '@/store/service-agent/project/types';

export const AgentProjectTable: React.FC = () => {
  const { getAllAgentProject, setPagination } = useActions();
  const {
    agentProjects,
    loading: { get, post },
  } = useTypedSelector((state) => state.agentProject);
  const {
    pagination: { current, pageSize, total },
  } = useTypedSelector((state) => state.app);

  useEffect(() => {
    getAllAgentProject({
      callback() {},
      pageNumber: current - 1,
      pageSize,
    });
  }, []);

  const generateUserData = addKeyProp<IAgentProjectV2>(agentProjects as IAgentProjectV2[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? (generateUserData as IAgentProjectV2[]) : []}
      pagination={{ current, pageSize, total }}
      onChange={(p) => setPagination(p)}
      loading={get || post}
      bordered
    />
  );
};
