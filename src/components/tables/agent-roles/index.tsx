import { Table } from '@/components';
import { addKeyProp, useTypedSelector } from '@/libs';
import { IRoles } from '@/store/agent/roles/types';
import React from 'react';
import { utils } from './utils';

export const AgenetRolesTable: React.FC = () => {
  const {
    roles,
    loading: { get },
  } = useTypedSelector((state) => state.roles);
  const generateUserData = addKeyProp<IRoles>(roles as IRoles[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? (generateUserData as IRoles[]) : []}
      loading={get}
      bordered
    />
  );
};
