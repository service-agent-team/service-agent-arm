import { useActions, useTypedSelector } from '@/common/hooks';
import { Card } from '@/components/common/card';
import { Badge, List, Tag, Typography } from 'antd';
import * as S from './styled';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { dateParser } from '@/common/utils/format';

export const AgentOrderCard = () => {
  const { id } = useParams();
  const { agent } = useTypedSelector((state) => state.agent);
  const { getAgentOrders } = useActions();
  const { orders, status } = useTypedSelector((state) => state.agentOrder);

  useEffect(() => {
    getAgentOrders({ start: '12.01.2024', end: '17.12.2024', status });
  }, [status]);
  const order = orders ? orders.find((order) => order.id === Number(id)) : null;

  return (
    <S.Block>
      <Card width="auto">
        <Badge.Ribbon
          style={{ position: 'absolute', right: '-37px' }}
          text={order?.order.TariffPlanName}
          color="success"
        />
        <List>
          <List.Item>
            <Typography.Text strong>Telefon raqam: </Typography.Text> {order?.order.PhoneNumber}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Username: </Typography.Text>
            {order?.order.Username}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Is Resident: </Typography.Text>
            {order?.isResident ? <Tag color="success">E-SIM</Tag> : <Tag color="error">PHYSIC</Tag>}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Is E-SIM: </Typography.Text>
            {order?.isEsim ? (
              <Tag color="success">Resident</Tag>
            ) : (
              <Tag color="error">Not Resident</Tag>
            )}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Mijoz nomi: </Typography.Text>
            {order?.order.CustomerName}
          </List.Item>
          <List.Item>
            <Typography.Text strong>User tavsifi: </Typography.Text>
            {order?.order.UserDescription}
          </List.Item>
          <List.Item>
            <Typography.Text strong>Department nomi: </Typography.Text>
            {order?.order.ParentDepartmentName}
          </List.Item>
          <List.Item>
            <Typography.Text strong>{"To'lov miqdori"}: </Typography.Text>
            {order?.order.PaymentsAmount + " so'm"}
          </List.Item>
          <List.Item>
            <Typography.Text strong>{'Olingan sana'}: </Typography.Text>
            {dateParser(order?.createdAt as string)}
          </List.Item>
        </List>
      </Card>
      <Card width="auto">
        <Badge.Ribbon
          style={{ position: 'absolute', right: '-37px' }}
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
        />
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
          {agent?.userRoles[0]?.role && (
            <List.Item>
              <Typography.Text strong>Role: </Typography.Text>
              {agent?.userRoles[0]?.role?.name}
            </List.Item>
          )}
          {agent?.userTariffPermissions[0]?.userTariff && (
            <List.Item>
              <Typography.Text strong>Category: </Typography.Text>
              {agent?.userTariffPermissions[0]?.userTariff?.tariffName}
            </List.Item>
          )}
          {agent?.userPermissions[0]?.permission && (
            <List.Item>
              <Typography.Text strong>Permission: </Typography.Text>
              {agent?.userPermissions[0]?.permission?.name}
            </List.Item>
          )}
          <List.Item>
            <Typography.Text strong>Company: </Typography.Text>
            Service-agent
          </List.Item>
        </List>
      </Card>
    </S.Block>
  );
};
