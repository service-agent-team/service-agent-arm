import { addKeyProp } from '@/common';
import { useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { Table } from '@/components';
import { ITariff } from '@/store/tariff/types';
import React, { useEffect } from 'react';
import { utils } from './utils';

export const TariffTable: React.FC = () => {
  const {
    tariff,
    loading: { get },
    errors,
  } = useTypedSelector((state) => state.tariff);

  useEffect(() => {
    if (errors) {
      addNotification(errors);
    }
  }, [errors, tariff]);

  const generateUserData = addKeyProp<ITariff>(tariff as ITariff[]);

  return (
    <Table
      columns={utils()}
      dataSource={generateUserData ? generateUserData : []}
      loading={get}
      bordered
    />
  );
};
