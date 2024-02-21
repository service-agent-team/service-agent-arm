import { addKeyProp } from '@/common';
import { addNotification } from '@/common/utils/addNotification';
import { Tab, Table } from '@/components';
import { useActions, useTypedSelector } from '@/hooks';
import { IUserData } from '@/store/agent/contract/contract.interface';
import { TabsProps } from 'antd';
import React, { useEffect } from 'react';
import { utils } from './utils';

export const AgentTable: React.FC = () => {
  const { setContarctSatus } = useActions();
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
      setContarctSatus('success');
    } else if (key === '2') {
      setContarctSatus('view');
    } else {
      setContarctSatus('reject');
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
      children: (
        <Table
          columns={utils()}
          dataSource={generateUserData ? (generateUserData as IUserData[]) : []}
          loading={get}
          bordered
        />
      ),
    },
  ];

  return <Tab defaultActiveKey="1" items={items} onChange={onChange} />;
};
