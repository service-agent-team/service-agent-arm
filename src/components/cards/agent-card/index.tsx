import { SimpleButton } from '@/components';
import { Card } from '@/components/common/card';
import { AgentForm } from '@/components/forms';
import { history, useActions, useTypedSelector } from '@/libs';
import { addNotification } from '@/libs/utils/addNotification';
import { IUserData } from '@/store/agent/contract/contract.interface';
import { Badge, Flex, List, Typography } from 'antd';
import { useEffect } from 'react';

interface IProps {
  data: IUserData | null;
}

export const AgentCard = ({ data }: IProps) => {
  const { getRoles, getCategory } = useActions();
  useEffect(() => {
    getRoles({ callback() {} });
    getCategory({ callback() {} });
  }, []);

  const { agent, roles, agentTariff } = useTypedSelector((state) => state);

  const { acceptAgnet, rejectAgnet } = useActions();
  const handleAccept = () => {
    acceptAgnet({
      callback() {
        addNotification('Agent tasdiqlandi');
        history.back();
      },
      userId: Number(agent.agent?.userId),
    });
  };
  const handleReject = () => {
    rejectAgnet({
      callback() {
        addNotification('Agent rad etildi');
        history.back();
      },
      userId: Number(agent.agent?.userId),
    });
  };
  return (
    <Badge.Ribbon
      text={
        data?.contractStatus === 'success'
          ? 'Tasdiqlangan'
          : data?.contractStatus === 'view'
          ? 'Kutilmoqda'
          : 'Rad etilgan'
      }
      color={
        data?.contractStatus === 'success'
          ? 'green'
          : data?.contractStatus === 'view'
          ? 'purple'
          : 'red'
      }
    >
      <Card width="600px">
        <List>
          <List.Item>
            <Typography.Text strong>
              {data?.firstName} {data?.lastName} {data?.middleName}
            </Typography.Text>
          </List.Item>
          <List.Item>
            <Typography.Text strong>Fuqoroligi: </Typography.Text> {data?.citizenship}
          </List.Item>
          <List.Item>
            <Typography.Text strong>{"Tug'ulgan sana"}: </Typography.Text> {data?.birthDate}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Manzil: </Typography.Text> {data?.address}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Ariza qoldirgan sanasi: </Typography.Text> {data?.startDate}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Ariza holati: </Typography.Text>{' '}
            {data?.contractStatus === 'view'
              ? 'Tasdiqlanishi kutilmoqda'
              : data?.contractStatus === 'success'
              ? 'Tasdiqlangan'
              : null}
          </List.Item>
        </List>
        <AgentForm
          userId={agent.agent?.userId}
          roles={roles.roles}
          categories={agentTariff.tariffs}
        />
        {
          /*data?.contractStatus === '' && */ <Flex gap="large" justify="space-around">
            <SimpleButton click={handleReject} color="--negative">
              Rad etish
            </SimpleButton>
            <SimpleButton color="" click={handleAccept}>
              Tasdiqlash
            </SimpleButton>
          </Flex>
        }
      </Card>
    </Badge.Ribbon>
  );
};
