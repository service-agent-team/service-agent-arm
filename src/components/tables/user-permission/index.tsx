import React, { useEffect } from 'react';
import { addNotification } from '@/common/utils/addNotification';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addKeyProp } from '@/common';
import { Table } from '@/components';
import { utils } from './utils';
import { IUserPermission } from '@/store/global/user-permission/types';

export const UserPermissionTable: React.FC = () => {
  const { getAllUserPermission } = useActions();
  const {
    userPermissions,
    loading: { get },
  } = useTypedSelector((state) => state.userPermission);

  useEffect(() => {
    getAllUserPermission({
      callback: () => {
        addNotification('successfully get all user permission');
      },
    });
  }, []);

  const generateUserData = addKeyProp<IUserPermission>(userPermissions as IUserPermission[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? generateUserData : []}
      loading={get}
      bordered
    />
  );
};
