import { PageTitle } from '@/components';
import { CarTypeForm } from '@/components/forms';
import React from 'react';

export const EditCarPage: React.FC = () => {
  return (
    <div>
      <PageTitle label="ortga" title="Edit Car" icon="RollbackOutlined" route="/transfer/cars" />
      <CarTypeForm type="edit" />
    </div>
  );
};
