import { PageTitle } from '@/components';
import { CarTypeForm } from '@/components/forms';

export const EditCarTypePage = () => {
  return (
    <>
      <PageTitle
        label="ortga"
        title="Edit CarType"
        icon="RollbackOutlined"
        route="/transfer/car-type"
      />
      <CarTypeForm type="edit" />
    </>
  );
};
