import { useActions, useTypedSelector } from '@/common/hooks';
import { PageTitle } from '@/components';
import { ROUTES } from '@/constants';
import React, { useEffect } from 'react';
import { CardItem } from './components/card-item/card-item';
import * as S from './styles';

export const CarModel: React.FC = () => {
  const { GetAllCarModel } = useActions();

  useEffect(() => {
    GetAllCarModel({
      callback() {},
      page: 0,
      size: 100,
    });
  }, []);

  const { carModels } = useTypedSelector((state) => state.carModel);

  return (
    <>
      <PageTitle
        title="Car models"
        icon="CarOutlined"
        route={ROUTES.carModelCreate}
        label="create"
      />
      <S.Flex gap="large">
        {carModels && carModels.map((item, i) => <CardItem item={item} key={i} />)}
      </S.Flex>
    </>
  );
};
