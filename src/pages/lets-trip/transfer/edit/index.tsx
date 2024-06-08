import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { LestTripTransferEditForm } from '@/components';
import { useTypedSelector } from '@/common/hooks';

export const LetsTripTransferEdit = () => {
  const { selectCategory } = useTypedSelector((state) => state.letsTripTransferCategory);

  return (
    <S.ViewStyled>
      <PageTitle
        title={`${selectCategory ? selectCategory?.name.en : ''} category edit a car`}
        icon="ArrowLeftOutlined"
        route={`${ROUTES.letsTripTransferCategory}/${selectCategory?.id}`}
        label="Back"
      />
      <LestTripTransferEditForm />
    </S.ViewStyled>
  );
};
