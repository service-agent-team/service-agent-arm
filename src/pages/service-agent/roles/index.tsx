import { useActions } from '@/common/hooks';
import { AgenetRolesTable, PageTitle } from '@/components';
import { ROUTES } from '@/constants';
import { useEffect } from 'react';

export const Roles = () => {
  const { getRoles } = useActions();

  useEffect(() => {
    getRoles({
      callback() {},
    });
  }, []);
  return (
    <div>
      <PageTitle
        title="Roles"
        icon="UserAddOutlined"
        route={ROUTES.agentRolesCreate}
        label="Create"
      />
      <AgenetRolesTable />
    </div>
  );
};
