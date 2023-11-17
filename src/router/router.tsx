import { useRoutes } from 'react-router-dom';
import { AgentLayout, Videos } from './agentLoadable';
import { UssdLayout } from './loadable';

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
