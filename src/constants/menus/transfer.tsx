import type { MenuProps } from 'antd';
import { ROUTES } from '../routes';
import { logo } from '@/assets';

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

export const TransferConf = {
  name: 'TRANSFER',
  logo: logo,
};
