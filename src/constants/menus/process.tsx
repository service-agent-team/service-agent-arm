import { letstripLogo } from '@/assets';
import { MenuProps } from 'antd';
import { ROUTES } from '../routes';

export const process: MenuProps['items'] = [
  {
    icon: 'HomeOutlined',
    key: ROUTES.processHome,
    label: 'Home',
  },
  {
    icon: 'ProjectOutlined',
    key: ROUTES.processProject,
    label: 'Projects',
  },
];

export const ProcessConf = {
  name: '',
  logo: letstripLogo,
};
