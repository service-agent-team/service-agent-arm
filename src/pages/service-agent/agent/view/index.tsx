import { useParams } from 'react-router-dom';
import * as S from './styles';
import { AgentCard, VideoCard } from '@/components';
import { useActions } from '@/libs';
import { useEffect } from 'react';
import { addNotification } from '@/libs/utils/addNotification';
import { Flex } from 'antd';
import { Card } from '@/components/common/card';

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
  return (
    <S.viewStyled>
      <Card width="100%">
        <S.Elements>Agent malumotlari</S.Elements>
      </Card>
      <Flex gap="large" justify="space-evenly">
        <VideoCard />
        <AgentCard />
      </Flex>
    </S.viewStyled>
  );
};
