import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { GlobalLayout } from '@/pages/layout';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Agents, Videos } from './agentLoadable';
import { SignIn, UssdLayout } from './loadable';
import { ProtectedRoutes } from './protected.routes';
import { PublicRoutes } from './public.routes';
import { ServiceAgentLayout } from '@/layouts/AgentLayout';
export const Routes = ({ isAuth }: { isAuth: boolean }) =>
  useRoutes([
    {
      element: <ProtectedRoutes isAuth={isAuth} />,
      children: [
        {
          path: ROUTES.home,
          element: <GlobalLayout />,
          children: [],
        },
        {
          path: '/agent',
          element: <ServiceAgentLayout />,
          children: [
            {
              path: 'agents',
              element: <Agents />,
            },
            {
              path: 'videos',
              element: <Videos />,
            },
          ],
        },
        {
          path: '/ussd',
          element: <UssdLayout />,
          children: [],
        },
      ],
    },
    {
      element: <PublicRoutes isAuth={isAuth} />,
      children: [
        {
          index: true,
          path: ROUTES.signIn,
          element: (
            <Suspense fallback={<Loading />}>
              <SignIn />
            </Suspense>
          ),
        },
      ],
    },
  ]);
