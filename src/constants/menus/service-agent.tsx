import { SettingFilled, VideoCameraFilled } from '@ant-design/icons';
import type { MenuProps } from 'antd';

export const serviceAgentMenu: MenuProps['items'] = [
  {
    label: 'Agents',
    key: '/agent/agents',
    icon: <VideoCameraFilled />,
  },
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
