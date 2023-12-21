import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { GlobalLayout, PrivateLayout, PublicLayout } from '@/layouts';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { SignIn, ProjectsPage } from './loadable';
import { mainRouter, agentRouter } from './modules';

export const Routes = ({ isAuth }: { isAuth: boolean }) =>
  useRoutes([
    {
      element: <PrivateLayout isAuth={isAuth} />,
      path: ROUTES.home,
      children: [
        {
          element: <ProjectsPage />,
          path: ROUTES.home,
        },
        {
          path: ROUTES.global,
          element: <GlobalLayout isAuth={isAuth} />,
          children: [...mainRouter],
        },
        {
          path: ROUTES.agent,
          element: <GlobalLayout isAuth={isAuth} />,
          children: [...agentRouter],
        },
      ],
    },
    {
      element: <PublicLayout isAuth={isAuth} />,
      children: [
        {
          index: true,
          path: ROUTES.login,
          element: (
            <Suspense fallback={<Loading />}>
              <SignIn />
            </Suspense>
          ),
        },
      ],
    },
  ]);
