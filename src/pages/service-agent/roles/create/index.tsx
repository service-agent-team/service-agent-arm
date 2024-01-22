import { PageTitle } from '@/components';
import { AgentRolesForm } from '@/components/forms';
import React from 'react';

export const CreateAgentRole: React.FC = () => {
  return (
    <>
      <PageTitle
        label="ortga"
        title="Create Role"
        icon="RollbackOutlined"
        route="/service-agent/roles"
      />

      <AgentRolesForm type="create" />
    </>
  );
};
