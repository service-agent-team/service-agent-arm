import { ROUTES } from '@/constants';
import { PageTitle, AgentTable, AgenetProductsTable } from '@/components';
import { useActions, useTypedSelector } from '@/libs';
import { useEffect } from 'react';
import { addNotification } from '@/libs/utils/addNotification';
import { SimplePage } from '@/components/common/page';

export function Products() {
  const { getByProducts } = useActions();
  useEffect(() => {
    getByProducts({
      categoryId: 6,
      page: 0,
      size: 20,
      callback() {
        addNotification('successfully get users');
      },
    });
  }, []);
  return (
    <SimplePage>
      <PageTitle
        title="Products"
        icon="PlusOutlined"
        route={ROUTES.agentProductCreate}
        label="Create"
      />
      <AgenetProductsTable />
    </SimplePage>
  );
}
