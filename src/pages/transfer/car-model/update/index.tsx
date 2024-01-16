import { PageTitle } from '@/components';
import { CarModelForm } from '@/components/forms';
import { ROUTES } from '@/constants';

export const UpdateCarModel = () => {
  return (
    <div>
      <PageTitle
        title="Car models update"
        icon="RollbackOutlined"
        route={ROUTES.carModel}
        label="back"
      />
      <CarModelForm type="edit" />
    </div>
  );
};
