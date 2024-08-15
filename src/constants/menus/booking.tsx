import { letstriplogo } from '@/assets';
import { MenuProps } from 'antd';
import { ROUTES } from '../routes';

export const booking: MenuProps['items'] = [
  {
    icon: 'HomeOutlined',
    key: ROUTES.bookingHome,
    label: 'Home',
  },
  {
    icon: 'InsertRowRightOutlined',
    key: ROUTES.bookingFacility,
    label: 'Facility',
  },
  {
    icon: 'InsertRowRightOutlined',
    key: ROUTES.bookingFacilityCategory,
    label: 'Facility Category',
  },
  {
    icon: 'BoxPlotOutlined',
    key: ROUTES.bookingBedType,
    label: 'Bed Type',
  },
  {
    icon: 'InboxOutlined',
    key: ROUTES.bookingBreakfast,
    label: 'Breakfast',
  },
];

export const BookingConf = {
  name: '',
  logo: letstriplogo,
};
