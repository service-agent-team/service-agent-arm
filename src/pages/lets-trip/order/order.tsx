import { useActions, useTypedSelector } from '@/common/hooks';
import { SimplePage } from '@/components/common/page';
import { OrderViewModal } from '@/components/modal';
import { LetsTripOrderTable } from '@/components/tables';
import { LetsTripOrderStatus, LetsTripOrderType } from '@/store/lets-trip/order/types';
import { Flex, Segmented } from 'antd';

export const LetsTripOrder = () => {
  const { status, type } = useTypedSelector((state) => state.letsTripOrder);
  const { setLetsTripOrderStatus } = useActions();

  const options = [
    {
      label: 'DELETED',
      value: LetsTripOrderStatus.DELETED,
    },
    {
      label: 'DRAFT',
      value: LetsTripOrderStatus.DRAFT,
    },
    {
      label: 'FAILED',
      value: LetsTripOrderStatus.FAILED,
    },
    {
      label: 'ON THE WAY',
      value: LetsTripOrderStatus.ON_THE_WAY,
    },
  ];

  if (type === LetsTripOrderType.TOUR)
    options.push(
      { label: 'CREATED', value: LetsTripOrderStatus.CREATED },
      { label: 'CONFIRMED', value: LetsTripOrderStatus.CONFIRMED },
    );
  else if (type === LetsTripOrderType.TRANSFER)
    options.push(
      { label: 'CREATED', value: LetsTripOrderStatus.CREATED },
      { label: 'COMPLETED', value: LetsTripOrderStatus.COMPLETED },
    );
  else if (type === LetsTripOrderType.LUGGAGE)
    options.push(
      { label: 'CREATED', value: LetsTripOrderStatus.CREATED },
      { label: 'CANCELED', value: LetsTripOrderStatus.CANCELED },
    );
  else if (type === LetsTripOrderType.SIM_CARD)
    options.push(
      { label: 'CREATED', value: LetsTripOrderStatus.CREATED },
      { label: 'CANCELED', value: LetsTripOrderStatus.CANCELED },
    );

  const handleChangeStatus = (value: LetsTripOrderStatus) => {
    setLetsTripOrderStatus(value);
  };

  return (
    <SimplePage>
      <Flex align="center" justify="center" style={{ padding: '20px 0' }}>
        <Segmented
          size="large"
          width={'100%'}
          options={options}
          defaultValue={status}
          onChange={(e: LetsTripOrderStatus) => handleChangeStatus(e)}
        />
      </Flex>
      <LetsTripOrderTable />
      <OrderViewModal />
    </SimplePage>
  );
};
