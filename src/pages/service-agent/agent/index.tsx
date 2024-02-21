import { addNotification } from '@/common/utils/addNotification';
import { AgentTable, PageTitle } from '@/components';
import { ROUTES } from '@/constants';
import { useActions, useTypedSelector } from '@/hooks';
import { useEffect } from 'react';
import * as S from './styles';

export function AgentControl() {
  const { getAllUsers } = useActions();
  const { status } = useTypedSelector((state) => state.agent);
  useEffect(() => {
    getAllUsers({
      callback() {
        addNotification('successfully get users');
      },
      statusName: status,
    });
  }, [status]);

  return (
    <S.agentStyled>
      <PageTitle title="Agents" icon="UserAddOutlined" route={ROUTES.create} label="" />
      <AgentTable />
    </S.agentStyled>
  );
}
