import { PageTitle } from '@/components';
import { TariffForm } from '@/components/forms';
import React from 'react';

export const CreateTariffPage: React.FC = () => {
  return (
    <div>
      <PageTitle
        label="ortga"
        title="Create Tariff"
        icon="RollbackOutlined"
        route="/transfer/tariff"
      />
      <TariffForm />
    </div>
  );
};
