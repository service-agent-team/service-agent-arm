import { ROUTES } from '@/constants';
import { PageTitle, AgenetTariffTable } from '@/components';
import { useActions, useTypedSelector } from '@/libs';
import { useEffect } from 'react';
import { addNotification } from '@/libs/utils/addNotification';

export function Tariff() {
  const { getCategory } = useActions();

  useEffect(() => {
    getCategory({
      callback() {
        addNotification('successfully get users');
      },
    });
  }, []);
  return (
    <div>
      <PageTitle title="Tariffs" icon="UserAddOutlined" route={ROUTES.create} label="Create" />
      <AgenetTariffTable />
    </div>
  );
}
