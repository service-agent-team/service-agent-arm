import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { AgentProjectForm } from '@/components/';

export const AgentProjectEdit = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Update agent project"
        icon="ArrowLeftOutlined"
        route={ROUTES.agentProject}
        label="Back"
      />
      <AgentProjectForm type="edit" />
    </S.ViewStyled>
  );
};
