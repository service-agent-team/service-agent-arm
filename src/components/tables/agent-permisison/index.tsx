import { addKeyProp } from '@/common';
import { Table } from '@/components';
import { useTypedSelector } from '@/hooks';
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
