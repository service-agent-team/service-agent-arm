import { useActions, useTypedSelector } from '@/common/hooks';
import { addNotification } from '@/common/utils/addNotification';
import { AgentCard, PageTitle, VideoCard } from '@/components';
import { ROUTES } from '@/constants';
import { Flex } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import * as S from './styles';

export const View = () => {
  const { id } = useParams();
  const { getOneAgent } = useActions();

  useEffect(() => {
    getOneAgent({
      callback() {
        addNotification('successfully get users');
      },
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
      <Flex gap="large" justify="space-evenly" style={{ marginTop: '20px' }}>
        <VideoCard />
        <AgentCard data={agent} />
      </Flex>
    </S.viewStyled>
  );
};
