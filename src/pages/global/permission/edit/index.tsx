import { PageTitle, PermisionsForm } from '@/components';
import { ROUTES } from '@/constants';
import React from 'react';

export const PermissionEdit: React.FC = () => {
  return (
    <div>
      <PageTitle
        label="Back"
        title="Edit Permission"
        icon="RollbackOutlined"
        route={ROUTES.permissions}
      />
      <PermisionsForm type="edit" />
    </div>
  );
};
