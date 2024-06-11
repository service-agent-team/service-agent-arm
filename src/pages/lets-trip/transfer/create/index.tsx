import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { LestTripTransferCreateForm } from '@/components';
import { useTypedSelector } from '@/common/hooks';

export const LetsTripTransferCreate = () => {
  const { selectCategory } = useTypedSelector((state) => state.letsTripTransferCategory);
  return (
    <S.ViewStyled>
      <PageTitle
        title={`${selectCategory ? selectCategory?.name.en : ''} category create a car`}
        icon="ArrowLeftOutlined"
        route={`${ROUTES.letsTripTransferCategory}/${selectCategory?.id}`}
        label="Back"
      />
      <LestTripTransferCreateForm />
    </S.ViewStyled>
  );
};
