import { Flex, Segmented } from 'antd';
import * as S from './styled';
import { AgentOrderTable } from '@/components';
import { useActions } from '@/common/hooks';

export const OrderPage = () => {
  const { setAgentOrderStatus } = useActions();
  const handleStatus = (value: number) => {
    setAgentOrderStatus(value);
  };

  return (
    <S.Box>
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
      <AgentOrderTable />
    </S.Box>
  );
};
