import { Card } from '@/components/common/card';
import { Badge, Flex, List, Typography } from 'antd';
import { history, useActions, useTypedSelector } from '@/libs';
import { SimpleButton } from '@/components';
import { addNotification } from '@/libs/utils/addNotification';

export const AgentCard = () => {
  const { agent } = useTypedSelector((state) => state.agent);
  const { acceptAgnet, rejectAgnet } = useActions();
  const handleAccept = () => {
    acceptAgnet({
      callback() {
        addNotification('Agent tasdiqlandi');
        history.back();
      },
      userId: Number(agent?.userId),
    });
  };
  const handleReject = () => {
    rejectAgnet({
      callback() {
        addNotification('Agent rad etildi');
        history.back();
      },
      userId: Number(agent?.userId),
    });
  };
  return (
    <Badge.Ribbon
      text={
        agent?.contractStatus === 'success'
          ? 'Tasdiqlangan'
          : agent?.contractStatus === 'view'
          ? 'Kutilmoqda'
          : 'Rad etilgan'
      }
      color={
        agent?.contractStatus === 'success'
          ? 'green'
          : agent?.contractStatus === 'view'
          ? 'purple'
          : 'red'
      }
    >
      <Card width="600px">
        <List>
          <List.Item>
            <Typography.Text strong>
              {agent?.firstName} {agent?.lastName} {agent?.middleName}
            </Typography.Text>
          </List.Item>
          <List.Item>
            <Typography.Text strong>Fuqoroligi: </Typography.Text> {agent?.citizenship}
          </List.Item>
          <List.Item>
            <Typography.Text strong>{"Tug'ulgan sana"}: </Typography.Text> {agent?.birthDate}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Manzil: </Typography.Text> {agent?.address}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Ariza qoldirgan sanasi: </Typography.Text> {agent?.startDate}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Ariza holati: </Typography.Text>{' '}
            {agent?.contractStatus === 'view'
              ? 'Tasdiqlanishi kutilmoqda'
              : agent?.contractStatus === 'success'
              ? 'Tasdiqlangan'
              : null}
          </List.Item>
        </List>
        {agent?.contractStatus === 'view' && (
          <Flex gap="large" justify="space-around">
            <SimpleButton click={handleReject} color="--negative">
              Rad etish
            </SimpleButton>
            <SimpleButton color="" click={handleAccept}>
              Tasdiqlash
            </SimpleButton>
          </Flex>
        )}
      </Card>
    </Badge.Ribbon>
  );
};
