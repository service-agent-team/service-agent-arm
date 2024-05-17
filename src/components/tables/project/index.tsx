import { addKeyProp } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { Table } from '@/components';
import React, { useEffect } from 'react';
import { utils } from './utils';
import { IProject } from '@/store/global/project/types';

export const ProjectTable: React.FC = () => {
  const { getAllProject } = useActions();
  const {
    projects,
    loading: { get },
  } = useTypedSelector((state) => state.project);

  useEffect(() => {
    getAllProject({
      callback() {},
    });
  }, []);
  const generateUserData = addKeyProp<IProject>(projects as IProject[]);

  return (
    <Table
      columns={utils()}
      className="primary-table"
      dataSource={generateUserData ? (generateUserData as IProject[]) : []}
      loading={get}
      bordered
    />
  );
};
