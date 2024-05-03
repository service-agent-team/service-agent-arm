import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { LestTripTourCreateForm } from '@/components/forms';

export const LetsTripTourGroupCreate = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Create Group Tour"
        icon="ArrowLeftOutlined"
        route={ROUTES.letsTripGroupTour}
        label="Back"
      />
      <LestTripTourCreateForm />
    </S.ViewStyled>
  );
};
