import { PageTitle } from '@/components';
import { AgentPermissionForm } from '@/components/forms';
import React from 'react';

export const EditAgentPermission: React.FC = () => {
  return (
    <>
      <PageTitle
        label="ortga"
        title="Edit Permission"
        icon="RollbackOutlined"
        route="/service-agent/permissions"
      />

      <AgentPermissionForm type="edit" />
    </>
  );
};
