import { Table } from '@/components';
import { addKeyProp, useTypedSelector } from '@/libs';
import { IPermission } from '@/store/agent/permission/types';
import React from 'react';
import { utils } from './utils';

export const AgenetPermissionTable: React.FC = () => {
  const {
    permissions,
    loading: { get },
  } = useTypedSelector((state) => state.agentPermission);
  const generateUserData = addKeyProp<IPermission>(permissions as IPermission[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? (generateUserData as IPermission[]) : []}
      loading={get}
      bordered
    />
  );
};
