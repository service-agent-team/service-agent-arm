import { letstripLogo } from '@/assets';
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
    icon: 'InsertRowBelowOutlined',
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
  {
    icon: 'AuditOutlined',
    key: ROUTES.bookingTaxes,
    label: 'Taxes',
  },
];

export const BookingConf = {
  name: '',
  logo: letstripLogo,
};
