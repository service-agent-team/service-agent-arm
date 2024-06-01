import { PageTitle, PermisionsForm } from '@/components';
import { ROUTES } from '@/constants';

export const UserPermissionCreate = () => {
  return (
    <>
      <PageTitle
        label="Back"
        title="Create user permission"
        icon="RollbackOutlined"
        route={ROUTES.userPermission}
      />

      <PermisionsForm type="create" />
    </>
  );
};
