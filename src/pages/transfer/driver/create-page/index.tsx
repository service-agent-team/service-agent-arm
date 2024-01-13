import { PageTitle } from '@/components';
import { DriverForm } from '@/components/forms';
import { ROUTES } from '@/constants';
import React from 'react';

export const DriverCreatePage: React.FC = () => {
  return (
    <>
      <PageTitle title="Driver" icon="RollbackOutlined" route={ROUTES.driver} label="ortga" />
      <DriverForm type="create" />
    </>
  );
};
