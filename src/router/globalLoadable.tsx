import { Loading } from '@/components';
import loadable from '@loadable/component';

const handleCatchChunkError = () => {
  return { default: Loading };
};

export const Users = loadable(
  () =>
    import('@/pages/global/users')
      .then(({ Users }) => ({ default: Users }))
      .catch(handleCatchChunkError),
  { fallback: <Loading /> },
);

export const Permissions = loadable(
  () =>
    import('@/pages/global/permission')
      .then(({ Permissions }) => ({ default: Permissions }))
      .catch(handleCatchChunkError),
  { fallback: <Loading /> },
);

export const Roles = loadable(
  () =>
    import('@/pages/global/roles')
      .then(({ Roles }) => ({ default: Roles }))
      .catch(handleCatchChunkError),
  { fallback: <Loading /> },
);

export const UserRoles = loadable(
  () =>
    import('@/pages/global/user-roles')
      .then(({ UserRoles }) => ({ default: UserRoles }))
      .catch(handleCatchChunkError),
  { fallback: <Loading /> },
);

export const UserPermissions = loadable(
  () =>
    import('@/pages/global/user-permissions')
      .then(({ UserPermissions }) => ({ default: UserPermissions }))
      .catch(handleCatchChunkError),
  { fallback: <Loading /> },
);

export const Projects = loadable(
  () =>
    import('@/pages/global/projects')
      .then(({ Projects }) => ({ default: Projects }))
      .catch(handleCatchChunkError),
  { fallback: <Loading /> },
);
