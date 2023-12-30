import { PageTitle, PermisionsForm } from '@/components';
import React from 'react';

export const PermissionCreatePage: React.FC = () => {
  return (
    <div>
      <PageTitle
        label="ortga "
        title="Create Permission"
        icon="RollbackOutlined"
        route="/global/permissions"
      />
      <PermisionsForm />
    </div>
  );
};
