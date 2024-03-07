import { useActions, useTypedSelector } from '@/common/hooks';
import { AgentOrderCard } from '@/components/cards/agent-order';
import { Flex, Result, Segmented, Skeleton } from 'antd';
import { useEffect, useState } from 'react';

export const OrderPage = () => {
  const { getAgentOrders } = useActions();
  const { orders, loading } = useTypedSelector((state) => state.agentOrder);
  const [status, setStatus] = useState(4);
  const handleStatus = (value: number) => {
    setStatus(value);
  };

  useEffect(() => {
    getAgentOrders({ start: '12.01.2024', end: '17.02.2024', status: status });
  }, [status]);

  return (
    <div>
      <Flex
        justify="center"
        style={{
          marginBottom: 30,
        }}
      >
        <Segmented
          size="large"
          defaultValue={4}
          options={[
            { value: 4, label: 'Active' },
            { value: 217, label: 'Payment pending' },
            { value: 12, label: 'Deleted' },
          ]}
          onChange={(value: any) => handleStatus(value)}
        />
      </Flex>
      <Flex style={{ width: '100%' }} gap={23} justify="center" wrap="wrap">
        {orders?.length ? (
          orders?.map((el, i) => (
            <Skeleton
              key={i}
              style={{ width: '300px', height: '400px' }}
              loading={loading.get}
              avatar
              active
            >
              <AgentOrderCard order={el} key={i} />
            </Skeleton>
          ))
        ) : (
          <Result
            status="404"
            title="Hozircha malumotlar yo'q"
            subTitle="Har bir jarayon shu yerda ko'rinadi"
          />
        )}
      </Flex>
    </div>
  );
};
