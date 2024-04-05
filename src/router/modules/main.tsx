import { Loading } from '@/components';
import { ROUTES } from '@/constants';
import { Suspense } from 'react';
import {
  EditUsers,
  Home,
  PermissionCreatePage,
  PermissionEdit,
  Permissions,
  ProjectCreate,
  ProjectEdit,
  Projects,
  RoleCreate,
  RoleEdit,
  Roles,
  UserCreatePage,
  UserPermissionCreate,
  UserPermissionEdit,
  UserPermissions,
  UserRoleCreate,
  UserRoleEdit,
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
    path: ROUTES.permissionCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <PermissionCreatePage />
      </Suspense>
    ),
  },
  {
    path: ROUTES.permissionEdit,
    element: (
      <Suspense fallback={<Loading />}>
        <PermissionEdit />
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
    path: ROUTES.roleCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <RoleCreate />
      </Suspense>
    ),
  },
  {
    path: ROUTES.roleEdit,
    element: (
      <Suspense fallback={<Loading />}>
        <RoleEdit />
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
    path: ROUTES.userRolesCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <UserRoleCreate />
      </Suspense>
    ),
  },
  {
    path: ROUTES.userRolesEdit,
    element: (
      <Suspense fallback={<Loading />}>
        <UserRoleEdit />
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
    path: ROUTES.userPermissionCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <UserPermissionCreate />
      </Suspense>
    ),
  },
  {
    path: ROUTES.userPermissionEdit,
    element: (
      <Suspense fallback={<Loading />}>
        <UserPermissionEdit />
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
  {
    path: ROUTES.projectCreate,
    element: (
      <Suspense fallback={<Loading />}>
        <ProjectCreate />
      </Suspense>
    ),
  },
  {
    path: ROUTES.projectEdit,
    element: (
      <Suspense fallback={<Loading />}>
        <ProjectEdit />
      </Suspense>
    ),
  },
  {
    path: ROUTES.editUsers,
    element: (
      <Suspense fallback={<Loading />}>
        <EditUsers />
      </Suspense>
    ),
  },
];
