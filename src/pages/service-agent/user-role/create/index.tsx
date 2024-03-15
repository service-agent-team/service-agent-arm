import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { AgentUserPermissionCreateForm } from '@/components/forms';

export const AgentUserRoleCreate = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Create Tour"
        icon="ArrowLeftOutlined"
        route={ROUTES.agentUserRole}
        label="Back"
      />
      <AgentUserPermissionCreateForm />
    </S.ViewStyled>
  );
};
