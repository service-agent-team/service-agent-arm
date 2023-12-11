import type { MenuProps } from 'antd';
import { BoxPlotFilled } from '@ant-design/icons';

export const ussdMenu: MenuProps['items'] = [
  {
    label: 'Packages',
    key: '/packages',
    icon: <BoxPlotFilled />,
  },
];
