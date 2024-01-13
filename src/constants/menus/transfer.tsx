import { logo } from '@/assets';
import type { MenuProps } from 'antd';
import { ROUTES } from '../routes';

export const transfer: MenuProps['items'] = [
  {
    key: ROUTES.transferHome,
    icon: 'HomeOutlined',
    label: 'Home',
  },
  {
    key: ROUTES.transferTariff,
    icon: 'MoneyCollectOutlined',
    label: 'Tariff',
  },
  {
    key: ROUTES.carType,
    icon: 'FileSearchOutlined',
    label: 'CarType',
  },
  {
    key: ROUTES.driver,
    icon: 'MedicineBoxOutlined',
    label: 'Driver',
  },
];

export const TransferConf = {
  name: 'TRANSFER',
  logo: logo,
};
