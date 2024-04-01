import { PageTitle, UserRoleTable } from '@/components';
import { ROUTES } from '@/constants';

export const UserRoles = () => {
  return (
    <>
      <PageTitle
        title="User Roles"
        icon="UserAddOutlined"
        route={ROUTES.userRolesCreate}
        label="Create"
      />
      <UserRoleTable />
    </>
  );
};
