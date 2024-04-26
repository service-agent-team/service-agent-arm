import { addKeyProp } from '@/common';
import { useTypedSelector } from '@/common/hooks';
import { Table } from '@/components';
import { IRolesV2 } from '@/store/service-agent/roles/types';
import React from 'react';
import { utils } from './utils';

export const AgenetRolesTable: React.FC = () => {
  const {
    allRole,
    loading: { get },
  } = useTypedSelector((state) => state.roles);
  const generateUserData = addKeyProp<IRolesV2>(allRole as IRolesV2[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? (generateUserData as IRolesV2[]) : []}
      loading={get}
      bordered
    />
  );
};
