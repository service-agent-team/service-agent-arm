import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { LestTripTourEditForm } from '@/components/forms';

export const LetsTripGroupTourEdit = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Edit Tour"
        icon="ArrowLeftOutlined"
        route={ROUTES.letsTripGroupTour}
        label="Back"
      />
      <LestTripTourEditForm />
    </S.ViewStyled>
  );
};
