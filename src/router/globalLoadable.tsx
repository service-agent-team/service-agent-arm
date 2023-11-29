import { Loading } from '@/components';
import loadable from '@loadable/component';

const handleCatchChunkError = () => {
  return { default: Loading };
};

export const Users = loadable(
  () =>
    import('@/pages/layout/users')
      .then(({ Users }) => ({ default: Users }))
      .catch(handleCatchChunkError),
  { fallback: <Loading /> },
);

export const Permissions = loadable(
  () =>
    import('@/pages/layout/permission')
      .then(({ Permissions }) => ({ default: Permissions }))
      .catch(handleCatchChunkError),
  { fallback: <Loading /> },
);

export const Roles = loadable(
  () =>
    import('@/pages/layout/roles')
      .then(({ Roles }) => ({ default: Roles }))
      .catch(handleCatchChunkError),
  { fallback: <Loading /> },
);

export const UserRoles = loadable(
  () =>
    import('@/pages/layout/user-roles')
      .then(({ UserRoles }) => ({ default: UserRoles }))
      .catch(handleCatchChunkError),
  { fallback: <Loading /> },
);

export const UserPermissions = loadable(
  () =>
    import('@/pages/layout/user-permissions')
      .then(({ UserPermissions }) => ({ default: UserPermissions }))
      .catch(handleCatchChunkError),
  { fallback: <Loading /> },
);

export const Projects = loadable(
  () =>
    import('@/pages/layout/projects')
      .then(({ Projects }) => ({ default: Projects }))
      .catch(handleCatchChunkError),
  { fallback: <Loading /> },
);
