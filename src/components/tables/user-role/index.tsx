import React, { useEffect } from 'react';
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
      callback: () => {},
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
