import { ROUTES } from '../routes';
import type { MenuProps } from 'antd';

export const agent: MenuProps['items'] = [
  {
    key: ROUTES.agentHome,
    icon: 'HomeOutlined',
    label: 'Home',
  },
  {
    label: 'Agents',
    key: ROUTES.agentControl,
    icon: 'UsergroupAddOutlined',
  },
];
