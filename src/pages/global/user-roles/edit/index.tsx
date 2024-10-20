import { PageTitle, UserRoleForm } from '@/components';
import { ROUTES } from '@/constants';

export const UserRoleEdit = () => {
  return (
    <>
      <PageTitle
        label="Back"
        title="Edit user role"
        icon="RollbackOutlined"
        route={ROUTES.userRoles}
      />

      <UserRoleForm type="edit" />
    </>
  );
};
