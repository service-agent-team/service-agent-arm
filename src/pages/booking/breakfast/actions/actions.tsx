import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';
import { Link } from 'react-router-dom';

export const Actions = ({ id }: { id: number }) => {
  return (
    <Flex gap={10} align="center" justify="center">
      <Link to={`${id}`}>
        <Button type="primary" icon={<EditOutlined />} />
      </Link>
      <Button danger type="dashed" icon={<DeleteOutlined />} />
    </Flex>
  );
};
