import { Icon } from '@/components';
import { ROUTES } from '@/constants';

export const menuItems = [
  {
    key: ROUTES.home,
    icon: <Icon name="HomeOutlined" />,
    label: 'Home',
  },
  {
    label: 'Users',
    key: ROUTES.users,
    icon: <Icon name="UsergroupAddOutlined" />,
  },
  {
    label: 'Permissions',
    key: ROUTES.permissions,
    icon: <Icon name="BlockOutlined" />,
  },
  {
    label: 'Roles',
    key: ROUTES.roles,
    icon: <Icon name="UnlockOutlined" />,
  },
  {
    label: 'User-roles',
    key: ROUTES.userRoles,
    icon: <Icon name="UserSwitchOutlined" />,
  },
  {
    label: 'User-permissions',
    key: ROUTES.userPermission,
    icon: <Icon name="TeamOutlined" />,
  },
  {
    label: 'Projects',
    key: ROUTES.projects,
    icon: <Icon name="ProjectOutlined" />,
  },
];
