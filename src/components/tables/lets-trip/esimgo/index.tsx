import { Table } from 'antd';
import { utils } from './utils';

export const LetsTripEsimGoTable = () => {
  return <Table columns={utils()} dataSource={[]} loading={false} bordered />;
};
