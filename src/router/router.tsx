import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { GlobalLayout } from '@/pages/layout';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { AgentLayout, Videos } from './agentLoadable';
import { SignIn, UssdLayout } from './loadable';
import { ProtectedRoutes } from './protected.routes';
import { PublicRoutes } from './public.routes';

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
