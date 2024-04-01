import { PageTitle, UserRoleForm } from '@/components';
import { ROUTES } from '@/constants';

export const UserRoleCreate = () => {
  return (
    <>
      <PageTitle
        label="Back"
        title="Create user role"
        icon="RollbackOutlined"
        route={ROUTES.userRoles}
      />

      <UserRoleForm type="create" />
    </>
  );
};
