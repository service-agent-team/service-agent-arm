import { useRoutes } from 'react-router-dom';
import { Home } from './loadable';
import { ROUTES } from '@/constants';

export const Router = () =>
  useRoutes([
    {
      path: ROUTES.home,
      element: <Home />,
    },
  ]);
