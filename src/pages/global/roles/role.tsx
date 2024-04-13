import { PageTitle, RoleTable } from '@/components';
import { ROUTES } from '@/constants';

export const Roles = () => {
  return (
    <>
      <PageTitle title="Roles" icon="UserAddOutlined" route={ROUTES.roleCreate} label="Create" />
      <RoleTable />
    </>
  );
};
