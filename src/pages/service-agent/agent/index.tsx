import { useActions, useTypedSelector } from '@/common/hooks';
import { AgentTable } from '@/components';
import { useEffect } from 'react';
import * as S from './styles';

export function AgentControl() {
  const { getAllUsers } = useActions();
  const { status } = useTypedSelector((state) => state.agent);

  useEffect(() => {
    getAllUsers({
      callback() {},
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
