import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { AgentProjectForm } from '@/components/';

export const AgentProjectCreate = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Create agent project"
        icon="ArrowLeftOutlined"
        route={ROUTES.agentProject}
        label="Back"
      />
      <AgentProjectForm type="create" />
    </S.ViewStyled>
  );
};
