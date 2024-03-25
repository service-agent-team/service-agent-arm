import { addKeyProp } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { Table } from '@/components';
import { IUserData } from '@/store/service-agent/contract/contract.interface';
import { Flex, Segmented } from 'antd';
import React, { useEffect } from 'react';
import { utils } from './utils';

export const AgentTable: React.FC = () => {
  const { setContarctSatus } = useActions();
  const {
    data,
    loading: { get },
    error,
    status,
  } = useTypedSelector((state) => state.agent);
  useEffect(() => {
    if (error) {
      addNotification(error);
    }
  }, [data]);
  const generateUserData = addKeyProp<IUserData>(data as IUserData[]);
  const handleChange = (value: string) => {
    if (value === '1') {
      setContarctSatus('success');
    } else if (value === '2') {
      setContarctSatus('view');
    } else {
      setContarctSatus('reject');
    }
  };

  const items = [
    {
      value: '1',
      label: 'Tasdiqlangan',
    },
    {
      value: '2',
      label: 'Kutilayotgan',
    },
    {
      value: '3',
      label: 'Rad etilgan',
    },
  ];

  return (
    <Flex align="center" justify="center" wrap="wrap" gap={23}>
      <Segmented
        size="large"
        defaultValue={status === 'success' ? '1' : status === 'view' ? '2' : '3'}
        options={items}
        onChange={handleChange}
      />
      <Table
        style={{ marginTop: '20px' }}
        columns={utils()}
        dataSource={generateUserData ? (generateUserData as IUserData[]) : []}
        loading={get}
        bordered
      />
    </Flex>
  );
};
