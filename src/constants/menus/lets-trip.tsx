import { ROUTES } from '../routes';
import { letstriplogo } from '@/assets';

export const letsTrip = [
  {
    icon: 'HomeOutlined',
    key: ROUTES.letsTripHome,
    label: 'Home',
  },
  {
    icon: 'InboxOutlined',
    key: ROUTES.letTripLuggage,
    label: 'Luggage delivery',
  },
  {
    icon: 'MedicineBoxOutlined',
    key: ROUTES.letsTripOrder,
    label: 'Orders',
  },
  {
    icon: 'CarOutlined',
    key: ROUTES.letsTripTour,
    label: 'Tours',
  },
  {
    icon: 'LineChartOutlined',
    key: ROUTES.letsTripTransfer,
    label: 'Transfers',
  },
];

export const LetsTripConf = {
  name: '',
  logo: letstriplogo,
};
