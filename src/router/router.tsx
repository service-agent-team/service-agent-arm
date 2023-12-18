import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { GlobalLayout, PrivateLayout, PublicLayout } from '@/layouts';
import { Suspense } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import {
  Home,
  Permissions,
  Projects,
  SignIn,
  ProjectsPage,
  UserCreatePage,
  UserPermissions,
  UserRoles,
  Users,
} from './loadable';

export const Routes = ({ isAuth }: { isAuth: boolean }) =>
  useRoutes([
    {
      element: <PrivateLayout isAuth={isAuth} />,
      path: ROUTES.home,
      children: [
        {
          element: <ProjectsPage />,
          path: ROUTES.projectsPage,
        },
        {
          path: ROUTES.home,
          element: <GlobalLayout isAuth={isAuth} />,
          children: [
            { path: '*', element: <Navigate to={ROUTES.main} /> },
            { index: true, element: <Navigate to={ROUTES.main} replace /> },
            {
              path: ROUTES.main,
              element: (
                <Suspense fallback={<Loading />}>
                  <Home />
                </Suspense>
              ),
            },
            {
              path: ROUTES.users,
              element: (
                <Suspense fallback={<Loading />}>
                  <Users />
                </Suspense>
              ),
            },
            {
              path: ROUTES.create,
              element: (
                <Suspense fallback={<Loading />}>
                  <UserCreatePage />
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
                  <Permissions />
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
              path: ROUTES.userPermission,
              element: (
                <Suspense fallback={<Loading />}>
                  <UserPermissions />
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
