import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { Suspense } from 'react';
import {
  Home,
  Permissions,
  Projects,
  UserCreatePage,
  UserPermissions,
  UserRoles,
  Users,
} from '../loadable';

export const mainRouter = [
  {
    path: ROUTES.global,
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
];
