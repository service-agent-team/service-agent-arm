import { PageTitle } from '@/components';
import { ROUTES } from '@/constants';
import { useActions, useTypedSelector } from '@/libs';
import { DeleteOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Skeleton } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import * as S from './styled';

export const CarPage: React.FC = () => {
  const navigate = useNavigate();
  const { getCar } = useActions();
  const { loading, car } = useTypedSelector((state) => state.car);

  useEffect(() => {
    getCar({
      callback() {},
    });
  }, []);

  return (
    <>
      <PageTitle title="Car" icon="FileSearchOutlined" route={ROUTES.carCreate} label="create" />
      <S.cardWrapper>
        {car?.map((item, i) => {
          return (
            <Skeleton key={i} style={{ width: '300px' }} loading={loading.get} avatar active>
              <Card
                key={i}
                style={{ maxWidth: 300, width: '100%', margin: '0 auto' }}
                cover={<img alt={item.driverName} src={item.imageId} height={200} />}
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined
                    key="edit"
                    onClick={() => {
                      navigate(`/transfer/cars/edit/${item.carId}`);
                    }}
                  />,
                  <DeleteOutlined key="ellipsis" />,
                ]}
              >
                <Meta
                  avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
                  title={item.modelName}
                  description={item.driverName}
                />
              </Card>
            </Skeleton>
          );
        })}
      </S.cardWrapper>
    </>
  );
};
