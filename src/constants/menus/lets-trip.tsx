import { ROUTES } from '../routes';
import { letstriplogo } from '@/assets';

export const letsTrip = [
  {
    icon: 'HomeOutlined',
    key: ROUTES.letsTripHome,
    label: 'Home',
  },
  // {
  //   icon: 'InboxOutlined',
  //   key: ROUTES.letTripLuggage,
  //   label: 'Luggage delivery',
  // },
  // {
  //   icon: 'MedicineBoxOutlined',
  //   key: ROUTES.letsTripOrder,
  //   label: 'Orders',
  // },
  {
    icon: 'UsergroupAddOutlined',
    key: ROUTES.letsTripGroupTour,
    label: 'Group Tours',
  },
  {
    icon: 'UserAddOutlined',
    key: ROUTES.letsTripIndividualTour,
    label: 'Individual Tours',
  },
  {
    icon: 'CarOutlined',
    key: ROUTES.letsTripTransfer,
    label: 'Cars',
  },
  {
    icon: 'CarOutlined',
    key: ROUTES.letsTripTransferCategory,
    label: 'Car Category',
  },
  // {
  //   icon: 'DiffOutlined',
  //   key: ROUTES.letsTripEsimGo,
  //   label: 'Esim Go',
  // },
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
