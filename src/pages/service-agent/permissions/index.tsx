import { useActions } from '@/common/hooks';
import { AgentPermissionTable, PageTitle } from '@/components';
import { ROUTES } from '@/constants';
import { useEffect } from 'react';

export const PermissionPage = () => {
  const { getAgentPermissions } = useActions();

  useEffect(() => {
    getAgentPermissions({
      callback() {},
    });
  }, []);
  return (
    <div>
      <PageTitle
        title="Permissions"
        icon="UserAddOutlined"
        route={ROUTES.agentPermissionCreate}
        label="Create"
      />
      <AgentPermissionTable />
    </div>
  );
};
