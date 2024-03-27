import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { AgentProjectCreateForm } from '@/components/';

export const AgentProjectCreate = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Create agent project"
        icon="ArrowLeftOutlined"
        route={ROUTES.agentProject}
        label="Back"
      />
      <AgentProjectCreateForm />
    </S.ViewStyled>
  );
};
