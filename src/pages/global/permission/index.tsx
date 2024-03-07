import { useActions } from '@/common/hooks';
import { PageTitle, PermissionTable } from '@/components';
import { ROUTES } from '@/constants';
import { useEffect } from 'react';
import * as S from './styled';

export const Permissions = () => {
  const { getPermisions } = useActions();

  useEffect(() => {
    getPermisions({
      callback: () => {},
    });
  }, []);

  return (
    <S.permissionStyled>
      <PageTitle
        title="Permissions"
        icon="UserAddOutlined"
        route={ROUTES.permissionCreate}
        label="create"
      />
      <PermissionTable />
    </S.permissionStyled>
  );
};
