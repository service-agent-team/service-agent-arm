import { PageTitle } from '@/components';
import { AgentRolesForm } from '@/components/forms';
import React from 'react';

export const EditAgentRole: React.FC = () => {
  return (
    <>
      <PageTitle
        label="ortga"
        title="Edit Role"
        icon="RollbackOutlined"
        route="/service-agent/roles"
      />

      <AgentRolesForm type="edit" />
    </>
  );
};
