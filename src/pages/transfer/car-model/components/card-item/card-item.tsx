import { useTypedSelector } from '@/hooks';
import { ICarModel } from '@/types';
import { DeleteOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton } from 'antd';
import Meta from 'antd/es/card/Meta';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export const CardItem: React.FC<{ item: ICarModel }> = ({ item }: { item: ICarModel }) => {
  const { loading } = useTypedSelector((state) => state.carModel);
  const navigate = useNavigate();

  return (
    <Skeleton key={item.modelId} style={{ width: '300px' }} loading={loading.get} avatar active>
      <Card
        key={item.modelId}
        style={{ maxWidth: 300, width: '100%', margin: '0 auto' }}
        cover={<img alt={item.images[0]} src={item.images[0]} height={200} />}
        actions={[
          <SettingOutlined key="setting" />,
          <EditOutlined
            key="edit"
            onClick={() => {
              navigate(`/transfer/car-model/edit/${item.modelId}`);
            }}
          />,
          <DeleteOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
          title={item.name}
          description={`${new Date(item.createdAt).getDate()}-${new Date(item.createdAt).getMonth()}-${new Date(item.createdAt).getFullYear()}`}
        />
      </Card>
    </Skeleton>
  );
};
