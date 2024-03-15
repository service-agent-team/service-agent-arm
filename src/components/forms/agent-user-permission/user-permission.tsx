import { PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { ROUTES } from '@/constants';
import { AgentUserPermissionCreateForm } from './create';

export const AgentUserPermission = () => {
  return (
    <SimplePage>
      <PageTitle
        title="Agent user permissions"
        icon="PlusOutlined"
        route={ROUTES.agentUserPermissionCreate}
        label="Create"
      />
      <AgentUserPermissionCreateForm />
    </SimplePage>
  );
};
