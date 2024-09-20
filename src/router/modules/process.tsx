import { ROUTES } from '@/constants';
import { RouteObject } from 'react-router-dom';
import { ProcessHomePage } from '../loadable';

export const processRouter: RouteObject[] = [
  {
    path: ROUTES.processHome,
    element: <ProcessHomePage />,
  },
];
