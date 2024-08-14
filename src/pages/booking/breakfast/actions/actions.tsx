import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Flex } from 'antd';

export const Actions = ({ id }: { id: number }) => {
  return (
    <Flex gap={10} align="center" justify="center">
      <Button icon={<EditOutlined />} />
      <Button icon={<DeleteOutlined />} />
    </Flex>
  );
};
