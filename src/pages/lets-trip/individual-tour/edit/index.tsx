import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { LestTripIndividualTourEditForm } from '@/components/forms';

export const LetsTripIndividualTourEdit = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Edit Individual Tour"
        icon="ArrowLeftOutlined"
        route={ROUTES.letsTripIndividualTour}
        label="Back"
      />
      <LestTripIndividualTourEditForm />
    </S.ViewStyled>
  );
};
