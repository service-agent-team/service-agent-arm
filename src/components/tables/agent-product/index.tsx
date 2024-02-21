import { addKeyProp } from '@/common';
import { addNotification } from '@/common/utils/addNotification';
import { Table } from '@/components';
import { useTypedSelector } from '@/hooks';
import { IProduct } from '@/store/product/types';
import React, { useEffect } from 'react';
import { utils } from './utils';

export const AgenetProductsTable: React.FC = () => {
  const {
    products,
    loading: { get },
    errors,
  } = useTypedSelector((state) => state.product);

  useEffect(() => {
    if (errors) {
      addNotification(errors);
    }
  }, [errors, products]);

  const generateUserData = addKeyProp<IProduct>(products as IProduct[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? (generateUserData as IProduct[]) : []}
      loading={get}
      bordered
    />
  );
};
