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
];
