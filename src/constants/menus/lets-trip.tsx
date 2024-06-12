import { ROUTES } from '../routes';
import { letstriplogo } from '@/assets';

export const letsTrip = [
  {
    icon: 'HomeOutlined',
    key: ROUTES.letsTripHome,
    label: 'Home',
  },
  {
    icon: 'UsergroupAddOutlined',
    key: ROUTES.letsTripTour,
    label: 'Tours',
  },
  {
    icon: 'CarOutlined',
    key: ROUTES.letsTripTransferCategory,
    label: 'Cars',
  },
  {
    icon: 'GlobalOutlined',
    key: ROUTES.letsTripCountry,
    label: 'Countries',
  },
  {
    icon: 'GlobalOutlined',
    key: ROUTES.letsTripGlobalCountry,
    label: 'Global Countries',
  },
];

export const LetsTripConf = {
  name: '',
  logo: letstriplogo,
};
