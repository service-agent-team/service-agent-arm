import { useActions } from '@/common/hooks';
import { AgentTariffTable, PageTitle } from '@/components';
import { ROUTES } from '@/constants';
import { useEffect } from 'react';

export function Tariff() {
  const { getAllAgentTariffCategory } = useActions();

  useEffect(() => {
    getAllAgentTariffCategory({
      callback() {},
    });
  }, []);
  return (
    <div>
      <PageTitle
        title="Tariffs"
        icon="PlusOutlined"
        route={ROUTES.agentTariffCreate}
        label="Create"
      />
      <AgentTariffTable />
    </div>
  );
}
