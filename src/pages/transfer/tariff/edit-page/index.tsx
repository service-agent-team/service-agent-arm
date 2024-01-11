import { PageTitle } from '@/components';
import { TariffForm } from '@/components/forms';

export const EditTariffPage = () => {
  return (
    <>
      <PageTitle
        label="ortga"
        title="Edit Tariff"
        icon="RollbackOutlined"
        route="/transfer/tariff"
      />
      <TariffForm type="edit" />
    </>
  );
};
