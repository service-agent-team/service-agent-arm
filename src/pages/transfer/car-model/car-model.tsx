import { addNotification } from '@/common/utils/addNotification';
import { PageTitle } from '@/components';
import { ROUTES } from '@/constants';
import { useActions, useTypedSelector } from '@/hooks';
import { EditTwoTone } from '@ant-design/icons';
import { Card } from 'antd';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as S from './styles';

export const CarModel: React.FC = () => {
  const { GetAllCarModel } = useActions();
  useEffect(() => {
    GetAllCarModel({
      callback(data: any) {
        if (data) addNotification('Successs');
      },
    });
  }, []);

  const { carModel } = useTypedSelector((state) => state.carModel);
  return (
    <>
      <PageTitle
        title="Car models"
        icon="CarOutlined"
        route={ROUTES.carModelCreate}
        label="create"
      />
      <S.Flex gap="large">
        {carModel &&
          carModel.map((el, i) => (
            <Card
              style={{ width: 300 }}
              key={i}
              title="Model"
              bordered={true}
              extra={
                <Link to={`/transfer/car-model/update/${el.modelId}`}>
                  <EditTwoTone />
                </Link>
              }
            >
              {el.name}
            </Card>
          ))}
      </S.Flex>
    </>
  );
};
