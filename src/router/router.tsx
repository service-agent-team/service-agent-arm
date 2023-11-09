import { useRoutes } from 'react-router-dom';
import { ROUTES } from '@/constants';
import { UssdLayout } from './loadable';
import { AgentLayout, Videos } from './agentLoadable';

export const Router = () =>
  useRoutes([
    {
      path: '/agent',
      element: <AgentLayout />,
      children: [
        {
          path: 'videos',
          element: <Videos />,
        },
      ],
    },
    {
      path: '/ussd',
      element: <UssdLayout />,
    },
  ]);
