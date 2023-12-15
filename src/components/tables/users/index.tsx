import { Table } from '@/components';
import { addKeyProp, useTypedSelector } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { IUserResponseData } from '@/store/users/types';
import React, { useEffect } from 'react';
import { utils } from './utils';

export const UserTable: React.FC = () => {
  const {
    users,
    loading: { get },
    errors,
  } = useTypedSelector((state) => state.users);

  useEffect(() => {
    if (errors) {
      addNotification(errors);
    }
  }, [errors, users]);

  const generateUserData = addKeyProp<IUserResponseData>(users as IUserResponseData[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? (generateUserData as IUserResponseData[]) : []}
      loading={get}
      bordered
    />
  );
};
