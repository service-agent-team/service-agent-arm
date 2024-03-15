import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { AgentUserPermissionCreateForm } from '@/components/forms';

export const AgentUserPermissionCreate = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Create Tour"
        icon="ArrowLeftOutlined"
        route={ROUTES.agentUserPermission}
        label="Back"
      />
      <AgentUserPermissionCreateForm />
    </S.ViewStyled>
  );
};
