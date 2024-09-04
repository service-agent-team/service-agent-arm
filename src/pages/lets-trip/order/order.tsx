import { useActions, useTypedSelector } from '@/common/hooks';
import { SimplePage } from '@/components/common/page';
import { OrderViewModal } from '@/components/modal';
import { LetsTripOrderTable } from '@/components/tables';
import { LetsTripOrderStatus, LetsTripOrderType } from '@/store/lets-trip/order/types';
import { Flex, Segmented, Tooltip } from 'antd';

export const LetsTripOrder = () => {
  const { type } = useTypedSelector((state) => state.letsTripOrder);
  const { setLetsTripOrderStatus } = useActions();

  const options = [];

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
  else if (type === LetsTripOrderType.HOTEL) {
    options.push(
      {
        label: <Tooltip title="CREATED">CREATED</Tooltip>,
        value: LetsTripOrderStatus.CREATED,
      },
      {
        label: <Tooltip title="To'langan">CONFIRMED</Tooltip>,
        value: LetsTripOrderStatus.CONFIRMED,
      },
      {
        label: (
          <Tooltip title="To'langan bugandan keyin bu userni hotelini sotib olib berish kerak i shu statusga uzgartirib quyish kerak">
            COMPLETED
          </Tooltip>
        ),
        value: LetsTripOrderStatus.COMPLETED,
      },
      {
        label: (
          <Tooltip title="Buyurtma foydalanuvchi tomonidan bekor qilingandan so'ng, admin tomonidan ham bekor qilindi, bu uning ko'rib chiqilganligini tasdiqlaydi.">
            CANCELLED
          </Tooltip>
        ),
        value: LetsTripOrderStatus.ADMIN_CONFIRMED_CANCELED,
      },
    );
  }

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
          onChange={(e: LetsTripOrderStatus) => handleChangeStatus(e)}
        />
      </Flex>
      <LetsTripOrderTable />
      <OrderViewModal />
    </SimplePage>
  );
};
