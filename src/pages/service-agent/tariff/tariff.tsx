import { useActions } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { AgenetTariffTable, PageTitle } from '@/components';
import { ROUTES } from '@/constants';
import { useEffect } from 'react';

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
