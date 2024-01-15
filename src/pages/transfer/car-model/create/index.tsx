import { PageTitle } from '@/components';
import { CarModelForm } from '@/components/forms';
import { ROUTES } from '@/constants';

export const CreateCarModel = () => {
  return (
    <div>
      <PageTitle
        title="Car models cerate"
        icon="RollbackOutlined"
        route={ROUTES.carModel}
        label="back"
      />
      <CarModelForm type="create" />
    </div>
  );
};
