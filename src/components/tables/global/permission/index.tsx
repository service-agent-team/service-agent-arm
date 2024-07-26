import { addKeyProp } from '@/common';
import { useTypedSelector } from '@/common/hooks';
import { Table } from '@/components';
import { IPermissionResponseData } from '@/store';
import React from 'react';
import { utils } from './utils';

export const PermissionTable: React.FC = () => {
  const { loading, permissions } = useTypedSelector((state) => state.permission);

  const generateUserData = addKeyProp<IPermissionResponseData>(
    permissions as IPermissionResponseData[],
  );

  return <Table bordered columns={utils()} dataSource={generateUserData} loading={loading.get} />;
};
