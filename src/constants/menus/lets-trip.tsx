import { letstripLogo } from '@/assets';
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
    icon: 'RocketOutlined',
    key: ROUTES.letsTripGlobalCountry,
    label: 'Global Countries',
  },
  {
    icon: 'BoxPlotOutlined',
    key: ROUTES.letsTripOrder + 'hotel',
    label: 'Hotel Orders',
  },
  {
    icon: 'WalletOutlined',
    key: ROUTES.letsTripOrder + 'tour',
    label: 'Tour Orders',
  },
  {
    icon: 'CarOutlined',
    key: ROUTES.letsTripOrder + 'transfer',
    label: 'Transfer Orders',
  },
  {
    icon: 'PhoneOutlined',
    key: ROUTES.letsTripOrder + 'sim_card',
    label: 'Sim Orders',
  },
  {
    icon: 'AuditOutlined',
    key: ROUTES.letsTripOrder + 'luggage',
    label: 'Luggage Orders',
  },
  {
    icon: 'BarcodeOutlined',
    key: ROUTES.reffral,
    label: 'Referrals',
  },
  {
    icon: 'BellOutlined',
    key: ROUTES.letstripNotification,
    label: 'Notifications',
  },
  {
    icon: 'CommentOutlined',
    key: ROUTES.letstripFeedback,
    label: 'Feedbacks',
  },
];

export const LetsTripConf = {
  name: 'CORETEAM',
  logo: letstripLogo,
};
