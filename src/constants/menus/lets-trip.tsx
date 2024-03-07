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
];

export const LetsTripConf = {
  name: '',
  logo: letstriplogo,
};
