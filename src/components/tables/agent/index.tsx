import { addKeyProp } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { Table } from '@/components';
import { IUserDataV2 } from '@/store/service-agent/contract/contract.interface';
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
  const generateUserData = addKeyProp<IUserDataV2>(data as IUserDataV2[]);
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
  console.log('its work');

  return (
    <Flex align="center" justify="center" wrap="wrap" gap={13}>
      <Segmented
        size="large"
        defaultValue={status === 'success' ? '1' : status === 'view' ? '2' : '3'}
        options={items}
        onChange={handleChange}
      />
      <Table
        style={{ width: '100%' }}
        columns={utils()}
        dataSource={generateUserData ? (generateUserData as IUserDataV2[]) : []}
        loading={get}
        bordered
      />
    </Flex>
  );
};
