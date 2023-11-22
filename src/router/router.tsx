import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { Videos } from '@/pages';
import { GlobalLayout } from '@/pages/layout';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { AgentLayout } from './agentLoadable';
import { Permissions, Projects, Roles, UserPermissions, UserRoles, Users } from './globalLoadable';
import { ProjectsPage, SignIn, UssdLayout } from './loadable';
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
          children: [
            {
              path: ROUTES.users,
              element: (
                <Suspense fallback={<Loading />}>
                  <Users />
                </Suspense>
              ),
            },
            {
              path: ROUTES.permissions,
              element: (
                <Suspense fallback={<Loading />}>
                  <Permissions />
                </Suspense>
              ),
            },
            {
              path: ROUTES.roles,
              element: (
                <Suspense fallback={<Loading />}>
                  <Roles />
                </Suspense>
              ),
            },
            {
              path: ROUTES.userPermission,
              element: (
                <Suspense fallback={<Loading />}>
                  <UserPermissions />
                </Suspense>
              ),
            },
            {
              path: ROUTES.userRoles,
              element: (
                <Suspense fallback={<Loading />}>
                  <UserRoles />
                </Suspense>
              ),
            },
            {
              path: ROUTES.projects,
              element: (
                <Suspense fallback={<Loading />}>
                  <Projects />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: '/agent',
          element: <AgentLayout />,
          children: [
            {
              path: 'videos',
              element: (
                <Suspense fallback={<Loading />}>
                  <Videos />
                </Suspense>
              ),
            },
          ],
        },
        {
          path: '/ussd',
          element: <UssdLayout />,
          children: [],
        },
        {
          path: ROUTES.projectsPage,
          element: (
            <Suspense fallback={<Loading />}>
              <ProjectsPage />
            </Suspense>
          ),
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
