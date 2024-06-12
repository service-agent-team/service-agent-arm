import { PageTitle } from '@/components';
import * as S from './styled';
import { LestTripIndividualTourEditForm } from '@/components/forms';

export const LetsTripIndividualTourEdit = () => {
  return (
    <S.ViewStyled>
      <PageTitle title="Edit Individual Tour" />
      <LestTripIndividualTourEditForm />
    </S.ViewStyled>
  );
};
