import { PageTitle, RoleForm } from '@/components';
import { ROUTES } from '@/constants';

export const RoleCreate = () => {
  return (
    <>
      <PageTitle label="Back" title="Create role" icon="RollbackOutlined" route={ROUTES.roles} />
      <RoleForm type="create" />
    </>
  );
};
