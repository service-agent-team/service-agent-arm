import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { GlobalLayout, PrivateLayout, PublicLayout } from '@/layouts';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { SignIn, ProjectsPage } from './loadable';
import { mainRouter, agentRouter, transferRouter, letsTrip } from './modules';
import {
  global,
  GlobalConf,
  agent,
  AgentConf,
  transfer,
  TransferConf,
  LetsTripConf,
  letsTrip as letsTripMenu,
} from '@/constants/menus';

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
          element: <GlobalLayout isAuth={isAuth} items={global} conf={GlobalConf} />,
          children: [...mainRouter],
        },
        {
          path: ROUTES.agent,
          element: <GlobalLayout isAuth={isAuth} items={agent} conf={AgentConf} />,
          children: [...agentRouter],
        },
        {
          path: ROUTES.transfer,
          element: <GlobalLayout isAuth={isAuth} items={transfer} conf={TransferConf} />,
          children: [...transferRouter],
        },
        {
          path: ROUTES.letstrip,
          element: <GlobalLayout isAuth={isAuth} items={letsTripMenu} conf={LetsTripConf} />,
          children: [...letsTrip],
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
