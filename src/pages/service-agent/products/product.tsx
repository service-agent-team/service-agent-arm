import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { AgenetProductsTable, PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { ROUTES } from '@/constants';
import { Select, Space } from 'antd';
import { useEffect } from 'react';

export function Products() {
  const { getByProducts, setCategoryId } = useActions();
  const { categoryId } = useTypedSelector((state) => state.product);

  const changeCategory = (value: number) => {
    setCategoryId(value);
  };

  useEffect(() => {
    getByProducts({
      categoryId: categoryId,
      page: 0,
      size: 20,
      callback() {
        addNotification('successfully get users');
      },
    });
  }, [categoryId]);

  const Selectoption = [
    { label: 'UZS', value: 10 },
    { label: 'USD', value: 11 },
  ];
  return (
    <SimplePage>
      <PageTitle
        title="Products"
        icon="PlusOutlined"
        route={ROUTES.agentProductCreate}
        label="Create"
      />
      <Space>
        <Select
          onChange={changeCategory}
          defaultValue={{ label: 'USD', value: 11 }}
          style={{ width: '200px', marginBottom: '10px' }}
          options={Selectoption}
        />
      </Space>
      <AgenetProductsTable />
    </SimplePage>
  );
}
