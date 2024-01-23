import { AgenetProductsTable, PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { ROUTES } from '@/constants';
import { useActions } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { useEffect } from 'react';

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
