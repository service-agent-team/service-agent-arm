import { AppstoreAddOutlined, ControlOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

export const globalLayoutitems: MenuProps['items'] = [
  {
    label: 'Service-agent',
    key: '/agent',
    icon: <AppstoreAddOutlined />,
  },
  {
    label: 'Ussd-app',
    key: '/ussd',
    icon: <ControlOutlined />,
  },
];
