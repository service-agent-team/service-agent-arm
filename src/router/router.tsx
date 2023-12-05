import { ROUTES } from '@/constants';
import { useRoutes } from 'react-router-dom';
export const Routes = ({ isAuth }: { isAuth: boolean }) =>
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
