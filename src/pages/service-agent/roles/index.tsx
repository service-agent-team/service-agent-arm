import { PageTitle } from '@/components';
import { ROUTES } from '@/constants';
import { useActions } from '@/libs';
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
      {/* <AgenetRolesTable /> */}
    </div>
  );
};
