import { PageTitle } from '@/components';
import { AgentPermissionForm } from '@/components/forms';
import React from 'react';

export const CreateAgentPermission: React.FC = () => {
  return (
    <>
      <PageTitle
        label="ortga"
        title="Create Permissions"
        icon="RollbackOutlined"
        route="/service-agent/permissions"
      />

      <AgentPermissionForm type="create" />
    </>
  );
};
