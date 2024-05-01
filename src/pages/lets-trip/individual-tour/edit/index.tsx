import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { LestTripTourCreateForm } from '@/components/forms';

export const LetsTripGroupIndividualEdit = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Edit Individual Tour"
        icon="ArrowLeftOutlined"
        route={ROUTES.letsTripIndividualTourEdit}
        label="Back"
      />
      <LestTripTourCreateForm />
    </S.ViewStyled>
  );
};
