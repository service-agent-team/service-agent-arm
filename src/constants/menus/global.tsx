import { ROUTES } from '../routes';
import type { MenuProps } from 'antd';
export const global: MenuProps['items'] = [
  {
    key: ROUTES.global,
    icon: 'HomeOutlined',
    label: 'Home',
  },
  {
    label: 'Users',
    key: ROUTES.users,
    icon: 'UsergroupAddOutlined',
  },
  {
    label: 'Permissions',
    key: ROUTES.permissions,
    icon: 'BlockOutlined',
  },
  {
    label: 'Roles',
    key: ROUTES.roles,
    icon: 'UnlockOutlined',
  },
  {
    label: 'User-roles',
    key: ROUTES.userRoles,
    icon: 'UserSwitchOutlined',
  },
  {
    label: 'User-permissions',
    key: ROUTES.userPermission,
    icon: 'TeamOutlined',
  },
  {
    label: 'Projects',
    key: ROUTES.projects,
    icon: 'ProjectOutlined',
  },
];
