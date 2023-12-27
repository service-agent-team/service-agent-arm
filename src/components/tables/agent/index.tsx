import { Tab, Table } from '@/components';
import { addKeyProp, useActions, useTypedSelector } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { IUserData } from '@/store/agent/contract/contract.interface';
import React, { useEffect } from 'react';
import { utils } from './utils';
import { TabsProps } from 'antd';

export const AgentTable: React.FC = () => {
  const { setSatus } = useActions();
  const {
    data,
    loading: { get },
    error,
  } = useTypedSelector((state) => state.agent);
  useEffect(() => {
    if (error) {
      addNotification(error);
    }
  }, [data]);

  const generateUserData = addKeyProp<IUserData>(data as IUserData[]);
  const onChange = (key: string) => {
    if (key === '1') {
      setSatus('created');
    } else if (key === '2') {
      setSatus('view');
    }
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'Tasdiqlangan',
      children: (
        <Table
          columns={utils()}
          dataSource={generateUserData ? (generateUserData as IUserData[]) : []}
          loading={get}
          bordered
        />
      ),
    },
    {
      key: '2',
      label: 'Kutilayotgan',
      children: (
        <Table
          columns={utils()}
          dataSource={generateUserData ? (generateUserData as IUserData[]) : []}
          loading={get}
          bordered
        />
      ),
    },
    {
      key: '3',
      label: 'Rad etilgan',
      children: 'tab 3',
    },
  ];

  return <Tab defaultActiveKey="1" items={items} onChange={onChange} />;
};
