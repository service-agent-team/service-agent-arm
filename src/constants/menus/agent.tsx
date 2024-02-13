import { ROUTES } from '../routes';
import { logo } from '@/assets';

export const agent = [
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
    label: 'Orders',
    key: ROUTES.agentOrders,
    icon: 'ShoppingOutlined',
  },
  {
    label: 'Products',
    icon: 'DatabaseOutlined',
    key: ROUTES.agentProducts,
  },
  {
    label: 'Tariff Category',
    key: ROUTES.agentTariff,
    icon: 'AppstoreOutlined',
  },
  {
    label: 'Permissions',
    key: ROUTES.agentPermission,
    icon: 'ApartmentOutlined',
  },
  {
    label: 'Roles',
    key: ROUTES.agentRole,
    icon: 'ApartmentOutlined',
  },
];

export const AgentConf = {
  name: 'SERVICE AGENT',
  logo: logo,
};
