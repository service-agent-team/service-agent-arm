import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { LestTripTourCreateForm } from '@/components/forms';

export const LetsTripTourEdit = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Edit Tour"
        icon="ArrowLeftOutlined"
        route={ROUTES.letsTripTour}
        label="Back"
      />
      <LestTripTourCreateForm />
    </S.ViewStyled>
  );
};
