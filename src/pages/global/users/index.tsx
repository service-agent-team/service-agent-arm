import { PageTitle, UserTable } from '@/components';
import { ROUTES } from '@/constants';
import { useActions } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { useEffect } from 'react';
import * as S from './user.styled';

export const Users = () => {
  const { getUsers } = useActions();

  useEffect(() => {
    getUsers({
      callback() {
        addNotification('successfully get users');
      },
    });
  }, []);

  return (
    <S.userStyled>
      <PageTitle title="Users" icon="UserAddOutlined" route={ROUTES.create} label="create" />
      <UserTable />
    </S.userStyled>
  );
};
