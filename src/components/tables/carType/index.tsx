import { addKeyProp, addNotification } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Table } from '@/components';
import { ICarType } from '@/store/lets-trip/car-type/types';
import React, { useEffect } from 'react';
import { utils } from './utils';

export const CarTypetable: React.FC = () => {
  const { getCarType } = useActions();

  useEffect(() => {
    getCarType({
      page: 0,
      size: 100,
      callback() {},
    });
  }, []);

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
