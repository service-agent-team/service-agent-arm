import { AgentTariffCategoryForm } from '@/components';
import { PageTitle } from '@/components';
import { ROUTES } from '@/constants';
import * as S from './styled';

export const AgentTariffEdit = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Edit tariff"
        icon="ArrowLeftOutlined"
        route={ROUTES.agentTariff}
        label="Back"
      />
      <AgentTariffCategoryForm type="edit" />
    </S.ViewStyled>
  );
};
