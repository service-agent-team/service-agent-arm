import { ROUTES } from '@/constants';
import * as S from './styles';
import { PageTitle, AgentTable } from '@/components';
import { useActions, useTypedSelector } from '@/libs';
import { useEffect } from 'react';
import { addNotification } from '@/libs/utils/addNotification';

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
