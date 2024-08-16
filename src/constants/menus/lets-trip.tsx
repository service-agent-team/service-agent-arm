import { letstriplogo } from '@/assets';
import { ROUTES } from '../routes';

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
  {
    icon: 'WalletOutlined',
    key: ROUTES.letsTripOrder + 'tour',
    label: 'Tour Orders',
  },
  {
    icon: 'WalletOutlined',
    key: ROUTES.letsTripOrder + 'transfer',
    label: 'Transfer Orders',
  },
  {
    icon: 'WalletOutlined',
    key: ROUTES.letsTripOrder + 'sim_card',
    label: 'Sim Orders',
  },
  {
    icon: 'WalletOutlined',
    key: ROUTES.letsTripOrder + 'luggage',
    label: 'Luggage Orders',
  },
  {
    icon: 'WalletOutlined',
    key: ROUTES.reffral,
    label: 'Refferal',
  },
];

export const LetsTripConf = {
  name: '',
  logo: letstriplogo,
};
