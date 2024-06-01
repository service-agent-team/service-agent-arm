import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { LestTripTransferCategoryCreateForm } from '@/components';

export const LetsTripTransferCategoryCreate = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Create Transfer Category"
        icon="ArrowLeftOutlined"
        route={ROUTES.letsTripTransferCategory}
        label="Back"
      />
      <LestTripTransferCategoryCreateForm />
    </S.ViewStyled>
  );
};
