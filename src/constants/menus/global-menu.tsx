import {
  BlockOutlined,
  ProjectOutlined,
  TeamOutlined,
  UnlockOutlined,
  UserSwitchOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';

export const globalLayoutitems: MenuProps['items'] = [
  {
    label: 'Users',
    key: '/users',
    icon: <UsergroupAddOutlined />,
  },
  {
    label: 'Permissions',
    key: '/permissions',
    icon: <BlockOutlined />,
  },
  {
    label: 'Roles',
    key: '/roles',
    icon: <UnlockOutlined />,
  },
  {
    label: 'User-roles',
    key: '/user-roles',
    icon: <UserSwitchOutlined />,
  },
  {
    label: 'User-permissions',
    key: '/user-permissions',
    icon: <TeamOutlined />,
  },
  {
    label: 'Projects',
    key: '/projects',
    icon: <ProjectOutlined />,
  },
];
