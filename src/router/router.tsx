import { ROUTES } from '@/constants';
import { GlobalLayout, PrivateLayout, PublicLayout } from '@/layouts';
import { useRoutes } from 'react-router-dom';
import { SignIn, ProjectsPage, LanguageHomePage } from './loadable';
import { mainRouter, agentRouter, transferRouter, letsTripRouter, bookingRouter } from './modules';
import {
  global,
  GlobalConf,
  agent,
  AgentConf,
  transfer,
  TransferConf,
  LetsTripConf,
  letsTrip as letsTripMenu,
  booking,
  BookingConf,
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
          children: [...letsTripRouter],
        },
        {
          path: ROUTES.languageHome,
          element: <LanguageHomePage />,
        },
        {
          path: ROUTES.booking,
          element: <GlobalLayout isAuth={isAuth} items={booking} conf={BookingConf} />,
          children: [...bookingRouter],
        },
      ],
    },
    {
      element: <PublicLayout isAuth={isAuth} />,
      children: [
        {
          index: true,
          path: ROUTES.login,
          element: <SignIn />,
        },
      ],
    },
  ]);
