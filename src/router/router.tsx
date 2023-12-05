import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { PrivateLayout, PublicLayout } from '@/layouts';
import { Home } from './loadable';

export const Router = () =>
  useRoutes([
    {
      element: <PrivateLayout />,
      children: [
        {
          path: ROUTES.home,
          element: <Home />,
        },
      ],
    },
    // {
    //   element: <PublicLayout />,
    //   children: [
    //     {
    //       index: true,
    //       path: ROUTES.signIn,
    //       element: (
    //         <Suspense fallback={<Loading />}>
    //           <SignIn />
    //         </Suspense>
    //       ),
    //     },
    //   ],
    // },
  ]);
