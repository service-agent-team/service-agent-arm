import { PageTitle, UsersForm } from '@/components';
import React from 'react';

export const UserCreatePage: React.FC = () => {
  return (
    <div>
      <PageTitle label="ortga " title="Create User" icon="RollbackOutlined" route="/global/users" />
      <UsersForm />
    </div>
  );
};
