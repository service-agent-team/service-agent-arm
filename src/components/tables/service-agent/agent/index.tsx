import { addKeyProp } from '@/common';
import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { Table } from '@/components';
import {
  IAgentUserStatusType,
  IUserDataV2,
} from '@/store/service-agent/contract/contract.interface';
import { Flex, Segmented } from 'antd';
import React, { useEffect } from 'react';
import { utils } from './utils';

export const AgentTable: React.FC = () => {
  const { setContractStatus } = useActions();
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
  }, [data, error]);
  const generateUserData = addKeyProp<IUserDataV2>(data as IUserDataV2[]);
  const handleChange = (value: string) => {
    if (value === '1') {
      setContractStatus(IAgentUserStatusType.SUCCESS);
    } else if (value === '2') {
      setContractStatus(IAgentUserStatusType.VIEW);
    } else if (value === '3') {
      setContractStatus(IAgentUserStatusType.REJECT);
    } else {
      setContractStatus(IAgentUserStatusType.ANONIM);
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
    {
      value: '4',
      label: 'Anonim',
    },
  ];

  return (
    <Flex align="center" justify="center" wrap="wrap" gap={13}>
      <Segmented
        size="large"
        defaultValue={
          status === IAgentUserStatusType.SUCCESS
            ? '1'
            : status === IAgentUserStatusType.VIEW
              ? '2'
              : status === IAgentUserStatusType.REJECT
                ? '3'
                : '4'
        }
        options={items}
        onChange={handleChange}
      />
      <Table
        columns={utils()}
        dataSource={generateUserData ? (generateUserData as IUserDataV2[]) : []}
        loading={get}
        bordered
      />
    </Flex>
  );
};
