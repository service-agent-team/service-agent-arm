import { ROUTES } from '../routes';
import { letstriplogo } from '@/assets';

export const booking = [
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
    icon: 'CalendarOutlined',
    key: ROUTES.bookingCalendarPricing,
    label: 'Calendar Pricing',
  },
];

export const BookingConf = {
  name: '',
  logo: letstriplogo,
};
