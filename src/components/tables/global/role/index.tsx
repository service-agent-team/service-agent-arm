import { addKeyProp } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Table } from '@/components';
import React, { useEffect } from 'react';
import { utils } from './utils';
import { IRole } from '@/store/global/role/types';

export const RoleTable: React.FC = () => {
  const { getAllRole } = useActions();
  const { loading, roles } = useTypedSelector((state) => state.role);
  useEffect(() => {
    getAllRole({
      callback() {},
    });
  }, []);

  const generateUserData = addKeyProp<IRole>(roles as IRole[]);

  return <Table columns={utils()} bordered dataSource={generateUserData} loading={loading.get} />;
};
