import { useActions, useTypedSelector } from '@/common/hooks';
import { AgentCard, PageTitle } from '@/components';
import { ROUTES } from '@/constants';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './styles';

export const View = () => {
  const { id } = useParams();
  const { getOneAgent } = useActions();

  useEffect(() => {
    getOneAgent({
      callback() {},
      userId: Number(id),
    });
  }, [id]);
  const { agent } = useTypedSelector((state) => state.agent);
  return (
    <S.viewStyled>
      <PageTitle
        title={`${agent?.firstName || ''} ${agent?.lastName || ''} ${agent?.middleName || ''}`}
        icon="ArrowLeftOutlined"
        route={ROUTES.agentControl}
        label="Back"
      />
      <AgentCard data={agent} />
    </S.viewStyled>
  );
};
