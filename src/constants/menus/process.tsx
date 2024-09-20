import { letstriplogo } from '@/assets';
import { MenuProps } from 'antd';
import { ROUTES } from '../routes';

export const process: MenuProps['items'] = [
  {
    icon: 'HomeOutlined',
    key: ROUTES.processHome,
    label: 'Home',
  },
  {
    icon: 'InsertRowRightOutlined',
    key: ROUTES.processHome,
    label: 'Processes',
  },
];

export const ProcessConf = {
  name: '',
  logo: letstriplogo,
};
