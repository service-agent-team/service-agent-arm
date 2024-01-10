import { ROUTES } from '../routes';
import type { MenuProps } from 'antd';
import { logo } from '@/assets';

export const agent: MenuProps['items'] = [
  {
    icon: 'HomeOutlined',
    key: ROUTES.agentHome,
    label: 'Home',
  },
  {
    label: 'Agents',
    key: ROUTES.agentControl,
    icon: 'UsergroupAddOutlined',
  },
  {
    label: 'Categories',
    key: ROUTES.agentTariff,
    icon: 'DatabaseOutlined',
  },
  {
    label: 'Tariff Category',
    key: ROUTES.agentTariff,
    icon: 'AppstoreOutlined',
  },
  {
    label: 'Permissions',
    key: ROUTES.agentTariff,
    icon: 'ApartmentOutlined',
  },
  {
    label: 'Roles',
    key: ROUTES.agentTariff,
    icon: 'ApartmentOutlined',
  },
];

export const AgentConf = {
  name: 'SERVICE AGENT',
  logo: logo,
};
