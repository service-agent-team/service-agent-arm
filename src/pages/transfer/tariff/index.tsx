import { PageTitle, TariffTable } from '@/components';
import { ROUTES } from '@/constants';
import { useActions } from '@/hooks';
import { useEffect } from 'react';
import * as S from './styled';

export const Tariff = () => {
  const { getTariff } = useActions();

  useEffect(() => {
    getTariff({
      callback() {},
    });
  }, []);

  return (
    <S.tariffStyled>
      <PageTitle
        title="Tariff"
        icon="MoneyCollectOutlined"
        route={ROUTES.tariffCreate}
        label="create"
      />
      <TariffTable />
    </S.tariffStyled>
  );
};
