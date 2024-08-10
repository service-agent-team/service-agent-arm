import { dictionary } from '@/constants';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';

export const Add = ({ path, onClick }: { path?: string; onClick?: () => void }) => {
  const AddBtn = (
    <Button style={{ height: 45 }} type="primary" onClick={onClick}>
      <Flex align="center" gap="small">
        <PlusCircleOutlined />
        {dictionary.add}
      </Flex>
    </Button>
  );

  return <>{path ? <Link to={path}>{AddBtn}</Link> : AddBtn}</>;
};
