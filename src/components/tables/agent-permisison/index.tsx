import { addKeyProp } from '@/common';
import { useTypedSelector } from '@/common/hooks';
import { Table } from '@/components';
import { IPermission } from '@/store/service-agent/permission/types';
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
