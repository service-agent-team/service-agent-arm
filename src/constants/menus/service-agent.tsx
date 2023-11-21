/* eslint-disable prettier/prettier */
import { SettingFilled, VideoCameraFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';

export const serviceAgentMenu: MenuProps['items'] = [
  {
    label: 'Videos',
    key: '/agent/videos',
    icon: <VideoCameraFilled />,
  },
  {
    label: 'Settings',
    key: '/agent/settings',
    icon: <SettingFilled />,
  },
];
