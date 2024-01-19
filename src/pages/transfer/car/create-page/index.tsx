import { PageTitle } from '@/components';
import { CarTypeForm } from '@/components/forms';
import React from 'react';

export const CreateCarPage: React.FC = () => {
  return (
    <div>
      <PageTitle
        label="ortga"
        title="Create CarType"
        icon="RollbackOutlined"
        route="/transfer/cars"
      />
      <CarTypeForm type="create" />
    </div>
  );
};
