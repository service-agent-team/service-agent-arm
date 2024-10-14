import { Table } from '@/components/common';
import { utils } from './utils';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useEffect } from 'react';
import { subUtils } from './sub-utils';
import { IProcessProject } from '@/store/process/project/types';

export const ProcessProjectTable = () => {
  const {
    projects,
    loading: { get },
  } = useTypedSelector((s) => s.processProject);
  const { getAllProcessProject } = useActions();

  useEffect(() => {
    getAllProcessProject({});
  }, []);

  return (
    <Table
      rowKey={'id'}
      columns={utils()}
      expandable={{
        expandedRowRender: (record: IProcessProject) => subUtils(record, record.id),
      }}
      dataSource={projects ? projects : []}
      loading={get}
      bordered
    />
  );
};
