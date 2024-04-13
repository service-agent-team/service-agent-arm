import React, { useEffect } from 'react';
import { addNotification } from '@/common/utils/addNotification';
import { useActions, useTypedSelector } from '@/common/hooks';
import { IUserRole } from '@/store/global/user-role/types';
import { addKeyProp } from '@/common';
import { Table } from '@/components';
import { utils } from './utils';

export const UserRoleTable: React.FC = () => {
  const { getAllUserRole } = useActions();
  const {
    userRoles,
    loading: { get },
  } = useTypedSelector((state) => state.userRole);

  useEffect(() => {
    getAllUserRole({
      callback: () => {
        addNotification('successfully get all user roles');
      },
    });
  }, []);

  const generateUserData = addKeyProp<IUserRole>(userRoles as IUserRole[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? generateUserData : []}
      loading={get}
      bordered
    />
  );
};
