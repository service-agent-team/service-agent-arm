import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { AgentUserRoleCreateForm } from '@/components/forms';

export const AgentUserRoleCreate = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Create user role"
        icon="ArrowLeftOutlined"
        route={ROUTES.agentUserRole}
        label="Back"
      />
      <AgentUserRoleCreateForm />
    </S.ViewStyled>
  );
};
