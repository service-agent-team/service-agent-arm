import { Icon } from '@/components';
import { Card } from '@/components/common/card';
import { IAgentOrderData } from '@/store/service-agent/order/types';
import { Flex, List, Tag, Typography } from 'antd';
import * as S from './styles';
export interface IProps {
  order: IAgentOrderData;
}

export const AgentOrderCard = ({ order }: IProps) => {
  const { OrderState } = order.order;
  return (
    <Card width="300px" color="#5474e6">
      <Flex justify="space-between">
        <Typography.Text style={{ color: '#FEFBF6' }} strong>
          {order.order.ServiceOrderId}
        </Typography.Text>
        <Tag color="#61f721">
          {OrderState === 4
            ? 'Active'
            : OrderState === 6
            ? 'No active'
            : OrderState === 217
            ? 'pay pending'
            : 'qoralama'}
        </Tag>
      </Flex>

      <S.List size="large" style={{ width: '250px' }}>
        <List.Item
          style={{
            borderBottom: '2px solid #FEFBF6',
          }}
        >
          <Icon fontSize="25" color="#FEFBF6" name="PieChartOutlined" />
          <Typography.Text style={{ color: '#FEFBF6' }} strong>
            {order.order.TariffPlanName}
          </Typography.Text>
        </List.Item>
        <List.Item
          style={{
            borderBottom: '2px solid #FEFBF6',
          }}
        >
          <Icon fontSize="25" color="#FEFBF6" name="PhoneOutlined" />
          <Typography.Text style={{ color: '#FEFBF6' }} strong>
            {order.order.PhoneNumber}
          </Typography.Text>
        </List.Item>
        <List.Item
          style={{
            borderBottom: '2px solid #FEFBF6',
          }}
        >
          <Icon fontSize="25" color="#FEFBF6" name="DollarOutlined" />
          <Typography.Text style={{ color: '#FEFBF6' }} strong>
            5 $
          </Typography.Text>
        </List.Item>
        <List.Item
          style={{
            borderBottom: '2px solid #FEFBF6',
          }}
        >
          <Icon fontSize="25" color="#FEFBF6" name="CreditCardOutlined" />
          <Typography.Text style={{ color: '#FEFBF6' }} strong>
            {order.isEsim ? 'Esim' : 'Simple'}
          </Typography.Text>
        </List.Item>
        <List.Item
          style={{
            borderBottom: '2px solid #FEFBF6',
          }}
        >
          <Icon fontSize="25" color="#FEFBF6" name="UserOutlined" />
          <Typography.Text style={{ color: '#FEFBF6' }} strong>
            {order.isResident ? 'resident' : 'non-resident'}
          </Typography.Text>
        </List.Item>
      </S.List>
    </Card>
  );
};
