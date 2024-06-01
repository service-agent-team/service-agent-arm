import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { LestTripTransferCategoryEditForm } from '@/components';

export const LetsTripTransferCategoryEdit = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Edit Transfer Category"
        icon="ArrowLeftOutlined"
        route={ROUTES.letsTripTransferCategory}
        label="Back"
      />
      <LestTripTransferCategoryEditForm />
    </S.ViewStyled>
  );
};
