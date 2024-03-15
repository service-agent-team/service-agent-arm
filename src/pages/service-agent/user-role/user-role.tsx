import { PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { AgentUserRoleTable } from '@/components/tables';
import { ROUTES } from '@/constants';

export const AgentUserRole = () => {
  return (
    <SimplePage>
      <PageTitle
        title="User role"
        icon="PlusOutlined"
        route={ROUTES.agentUserRoleCreate}
        label="Create"
      />
      <AgentUserRoleTable />
    </SimplePage>
  );
};
