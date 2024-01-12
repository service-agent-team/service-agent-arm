import { CarTypetable, PageTitle } from '@/components';
import { ROUTES } from '@/constants';
import { useActions } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { useEffect } from 'react';

export const CarType = () => {
  const { getCarType } = useActions();

  useEffect(() => {
    getCarType({
      callback() {
        addNotification('successfully get carType');
      },
    });
  }, []);

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
