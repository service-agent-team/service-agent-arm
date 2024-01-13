import { DriverTable, PageTitle } from '@/components';
import { ROUTES } from '@/constants';
import { useActions } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { useEffect } from 'react';

export const DriverPage = () => {
  const { getDriver } = useActions();

  useEffect(() => {
    getDriver({
      callback() {
        addNotification('successfully get drivers');
      },
    });
  }, []);
  return (
    <>
      <PageTitle
        title="Driver"
        icon="FileSearchOutlined"
        route={ROUTES.driverCreate}
        label="create"
      />
      <DriverTable />
    </>
  );
};
