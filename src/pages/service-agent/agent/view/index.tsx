import { useParams } from 'react-router-dom';
import * as S from './styles';
import { AgentCard, PageTitle, VideoCard } from '@/components';
import { useActions, useTypedSelector } from '@/libs';
import { useEffect } from 'react';
import { addNotification } from '@/libs/utils/addNotification';
import { Flex } from 'antd';
import { Card } from '@/components/common/card';
import { ROUTES } from '@/constants';

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
        title="Agent Malumotlari"
        icon="ArrowLeftOutlined"
        route={ROUTES.agentControl}
        label="Back"
      />
      <Flex gap="large" justify="space-evenly" style={{ marginTop: '20px' }}>
        <VideoCard url={agent?.videoContentId} />
        <AgentCard data={agent} />
      </Flex>
    </S.viewStyled>
  );
};
