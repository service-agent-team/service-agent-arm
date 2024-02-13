import { AgenetPermissionTable, PageTitle } from '@/components';
import { ROUTES } from '@/constants';
import { useActions } from '@/libs';
import { useEffect } from 'react';

export const OrderPage = () => {
  //   const { } = useActions();

  useEffect(() => {}, []);
  return (
    <div>
      <PageTitle title="Orders" icon="UserAddOutlined" route={ROUTES.agentOrders} label="Create" />
      <AgenetPermissionTable />
    </div>
  );
};
