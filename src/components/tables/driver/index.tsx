import { Table } from '@/components';
import { addKeyProp, useTypedSelector } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { IDriver } from '@/store/driver/types';
import React, { useEffect } from 'react';
import { utils } from './utils';

export const DriverTable: React.FC = () => {
  const {
    driver,
    loading: { get },
    errors,
  } = useTypedSelector((state) => state.driver);

  useEffect(() => {
    if (errors) {
      addNotification(errors);
    }
  }, [errors, driver]);

  const generateUserData = addKeyProp<IDriver>(driver as IDriver[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? generateUserData : []}
      loading={get}
      bordered
    />
  );
};
