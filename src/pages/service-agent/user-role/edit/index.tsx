import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { AgentUserRoleEditForm } from '@/components/forms';

export const AgentUserRoleEdit = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Edit user role"
        icon="ArrowLeftOutlined"
        route={ROUTES.agentUserRole}
        label="Back"
      />
      <AgentUserRoleEditForm />
    </S.ViewStyled>
  );
};
