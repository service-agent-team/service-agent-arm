import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { LestTripTourCreateForm } from '@/components/forms';

export const LetsTripTourCreate = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Create Tour"
        icon="ArrowLeftOutlined"
        route={ROUTES.letsTripTour}
        label="Back"
      />
      <LestTripTourCreateForm />
    </S.ViewStyled>
  );
};
