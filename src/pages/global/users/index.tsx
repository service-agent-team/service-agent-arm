import { PageTitle, UserTable } from '@/components';
import { ROUTES } from '@/constants';
import { useActions } from '@/libs';
import { useEffect } from 'react';
import * as S from './styled';

export const Users = () => {
  const { getUsers } = useActions();

  useEffect(() => {
    getUsers({
      callback() {},
    });
  }, []);

  return (
    <S.userStyled>
      <PageTitle title="Users" icon="UserAddOutlined" route={ROUTES.create} label="create" />
      <UserTable />
    </S.userStyled>
  );
};
