import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { PrivateLayout, PublicLayout } from '@/layouts';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { Home, SignIn } from './loadable';

export const Routes = ({ isAuth }: { isAuth: boolean }) =>
  useRoutes([
    {
      element: <PrivateLayout isAuth={isAuth} />,
      children: [
        {
          path: ROUTES.home,
          element: <Home />,
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
