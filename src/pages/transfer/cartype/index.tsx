import { CarTypetable, PageTitle } from '@/components';
import { ROUTES } from '@/constants';

export const CarType = () => {
  return (
    <>
      <PageTitle
        title="Cartype"
        icon="FileSearchOutlined"
        route={ROUTES.carTypeCreate}
        label="create"
      />
      <CarTypetable />
    </>
  );
};
