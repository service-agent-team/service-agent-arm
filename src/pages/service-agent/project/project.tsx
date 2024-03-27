import { PageTitle } from '@/components';
import { SimplePage } from '@/components/common/page';
import { AgentProjectTable } from '@/components/tables/agent-project';
import { ROUTES } from '@/constants';

export const AgentProject = () => {
  return (
    <SimplePage>
      <PageTitle
        title="Projects"
        icon="PlusOutlined"
        route={ROUTES.agentProjectCreate}
        label="Create"
      />
      <AgentProjectTable />
    </SimplePage>
  );
};
