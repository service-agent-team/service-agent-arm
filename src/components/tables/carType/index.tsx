import { Table } from '@/components';
import { addKeyProp, useTypedSelector } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { ICarType } from '@/store/car-type/types';
import React, { useEffect } from 'react';
import { utils } from './utils';

export const CarTypetable: React.FC = () => {
  const {
    carType,
    loading: { get },
    errors,
  } = useTypedSelector((state) => state.carType);

  useEffect(() => {
    if (errors) {
      addNotification(errors);
    }
  }, [errors, carType]);

  const generateUserData = addKeyProp<ICarType>(carType as ICarType[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? generateUserData : []}
      loading={get}
      bordered
    />
  );
};
