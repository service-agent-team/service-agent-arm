import { PageTitle, UserPermissionTable } from '@/components';
import { ROUTES } from '@/constants';

export const UserPermissions = () => {
  return (
    <>
      <PageTitle
        title="User Permission"
        icon="UserAddOutlined"
        route={ROUTES.userPermissionCreate}
        label="Create"
      />
      <UserPermissionTable />
    </>
  );
};
