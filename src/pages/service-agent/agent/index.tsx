import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { AgentTable } from '@/components';
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
      page: 0,
      size: 300,
    });
  }, [status]);

  return (
    <S.agentStyled>
      <AgentTable />
    </S.agentStyled>
  );
}
