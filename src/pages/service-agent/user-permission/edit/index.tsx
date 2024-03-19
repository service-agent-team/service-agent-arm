import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { AgentUserPermissionEditForm } from '@/components/forms';

export const AgentUserPermissionEdit = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Edit user permission"
        icon="ArrowLeftOutlined"
        route={ROUTES.agentUserPermission}
        label="Back"
      />
      <AgentUserPermissionEditForm />
    </S.ViewStyled>
  );
};
