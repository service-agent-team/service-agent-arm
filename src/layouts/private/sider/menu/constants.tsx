import { Icon } from '@/components';
import { ROUTES } from '@/constants';
import { dictionary } from '@/layouts/private/dictionary';

const menuLabels = dictionary.labels;

export const menuItems = [
  {
    key: ROUTES.buildings,
    icon: <Icon name="HomeOutlined" />,
    label: menuLabels[0],
  },
  {
    key: ROUTES.commercialEstate,
    icon: <Icon name="CompassOutlined" />,
    label: menuLabels[1],
  },
  {
    key: ROUTES.companies,
    icon: <Icon name="BuildOutlined" />,
    label: menuLabels[2],
  },
  {
    key: ROUTES.news,
    icon: <Icon name="NotificationOutlined" />,
    label: menuLabels[3],
  },
  {
    key: ROUTES.requests,
    icon: <Icon name="QuestionCircleOutlined" />,
    label: menuLabels[4],
  },
  {
    key: ROUTES.gallery,
    icon: <Icon name="PictureOutlined" />,
    label: menuLabels[5],
  },
  {
    key: ROUTES.announcement,
    icon: <Icon name="BarChartOutlined" />,
    label: menuLabels[6],
  },
];
