import { useActions, useTypedSelector } from '@/common/hooks';
import { SimplePage } from '@/components/common/page';
import { OrderViewModal } from '@/components/modal';
import { LetsTripOrderTable } from '@/components/tables';
import { LetsTripOrderStatus, LetsTripOrderType } from '@/store/lets-trip/order/types';
import { Flex, Segmented, Tooltip } from 'antd';

export const LetsTripOrder = () => {
  const { type, status } = useTypedSelector((state) => state.letsTripOrder);
  const { setLetsTripOrderStatus } = useActions();

  const options = [];
  const created = {
    label: <Tooltip title="CREATED">CREATED</Tooltip>,
    value: LetsTripOrderStatus.CREATED,
  };
  const confirmed = {
    label: <Tooltip title="To'langan">CONFIRMED</Tooltip>,
    value: LetsTripOrderStatus.CONFIRMED,
  };
  const cancelled = { label: 'CANCELLED', value: LetsTripOrderStatus.CANCELLED };
  const awaitingCashPayment = {
    label: 'AWAITING CASH PAYMENT',
    value: LetsTripOrderStatus.AWAITING_CASH_PAYMENT,
  };
  const adminCancelled = {
    label: (
      <Tooltip title="Buyurtma foydalanuvchi tomonidan bekor qilingandan so'ng, admin tomonidan ham bekor qilindi, bu uning ko'rib chiqilganligini tasdiqlaydi.">
        ADMIN CANCELLED
      </Tooltip>
    ),
    value: LetsTripOrderStatus.ADMIN_CONFIRMED_CANCELED,
  };

  if (type === LetsTripOrderType.TOUR)
    options.push(created, confirmed, awaitingCashPayment, cancelled, adminCancelled);
  else if (type === LetsTripOrderType.TRANSFER)
    options.push(created, confirmed, awaitingCashPayment, cancelled, adminCancelled);
  else if (type === LetsTripOrderType.LUGGAGE)
    options.push(
      created,
      confirmed,
      { label: 'ON THE WAY', value: LetsTripOrderStatus.ON_THE_WAY },
      { label: 'DELIVERED', value: LetsTripOrderStatus.DELIVERED },
      cancelled,
    );
  else if (type === LetsTripOrderType.SIM_CARD) options.push(created, confirmed, cancelled);
  else if (type === LetsTripOrderType.HOTEL) {
    options.push(created, confirmed, awaitingCashPayment, cancelled, adminCancelled);
  }

  const handleChangeStatus = (value: LetsTripOrderStatus) => {
    setLetsTripOrderStatus(value);
  };

  return (
    <SimplePage>
      <Flex align="center" justify="center" style={{ padding: '20px 0' }}>
        <Segmented
          defaultValue={status}
          size="large"
          width={'100%'}
          options={options}
          onChange={(e: LetsTripOrderStatus) => handleChangeStatus(e)}
        />
      </Flex>
      <LetsTripOrderTable />
      <OrderViewModal />
    </SimplePage>
  );
};
