import { Table } from '@/components';
import { addKeyProp, useTypedSelector } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
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