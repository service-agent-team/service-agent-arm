import { PageTitle, PermissionTable } from '@/components';
import { ROUTES } from '@/constants';
import { useActions } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { useEffect } from 'react';
import * as S from './styled';

export const Permissions = () => {
  const { getPermisions } = useActions();

  useEffect(() => {
    getPermisions({
      callback: () => {
        addNotification('successfully get permissions');
      },
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
