import { PageTitle, LestTripIndividualTourCreateForm } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';

export const LetsTripTourIndividualCreate = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Create Individual Tour"
        icon="ArrowLeftOutlined"
        route={ROUTES.letsTripIndividualTour}
        label="Back"
      />
      <LestTripIndividualTourCreateForm />
    </S.ViewStyled>
  );
};
