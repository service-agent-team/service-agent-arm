import { PageTitle } from '@/components';
import { CarTypeForm } from '@/components/forms';
import React from 'react';

export const CreateCarTypePage: React.FC = () => {
  return (
    <div>
      <PageTitle
        label="ortga"
        title="Create CarType"
        icon="RollbackOutlined"
        route="/transfer/car-type"
      />
      <CarTypeForm type="create" />
    </div>
  );
};
