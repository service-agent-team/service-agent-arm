import { PageTitle, RoleForm } from '@/components';
import { ROUTES } from '@/constants';

export const RoleEdit = () => {
  return (
    <>
      <PageTitle label="Back" title="Edit role" icon="RollbackOutlined" route={ROUTES.roles} />
      <RoleForm type="edit" />
    </>
  );
};
