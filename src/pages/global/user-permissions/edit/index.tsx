import { PageTitle, UserPermissionForm } from '@/components';
import { ROUTES } from '@/constants';

export const UserPermissionEdit = () => {
  return (
    <>
      <PageTitle
        label="Back"
        title="Edit user permission"
        icon="RollbackOutlined"
        route={ROUTES.userPermission}
      />
      <UserPermissionForm type="edit" />
    </>
  );
};
