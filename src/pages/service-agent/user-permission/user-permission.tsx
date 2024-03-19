import { PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { AgentUserPermissionTable } from '@/components/tables';
import { ROUTES } from '@/constants';

export const AgentUserPermission = () => {
  return (
    <SimplePage>
      <PageTitle
        title="User permissions"
        icon="PlusOutlined"
        route={ROUTES.agentUserPermissionCreate}
        label="Create"
      />
      <AgentUserPermissionTable />
    </SimplePage>
  );
};
