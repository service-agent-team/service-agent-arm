import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { GlobalLayout } from '@/pages/layout';
import { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import { ProjectsPage, SignIn, UssdLayout } from './loadable';
import { Permissions, Projects, Roles, UserPermissions, UserRoles, Users } from './globalLoadable';
import { ProtectedRoutes } from './protected.routes';
import { PublicRoutes } from './public.routes';
import { ServiceAgentLayout } from '@/layouts/AgentLayout';
import { Agents, Videos } from './agentLoadable';
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
          element: <ServiceAgentLayout />,
          children: [
            {
              path: 'agents',
              element: <Agents />,
            },
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
