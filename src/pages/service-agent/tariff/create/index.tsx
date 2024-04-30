import { AgentTariffCategoryForm } from '@/components';
import { PageTitle } from '@/components';
import { ROUTES } from '@/constants';
import * as S from './styled';

export const AgentTariffCreate = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Create tariff"
        icon="ArrowLeftOutlined"
        route={ROUTES.agentTariff}
        label="Back"
      />
      <AgentTariffCategoryForm type="create" />
    </S.ViewStyled>
  );
};
