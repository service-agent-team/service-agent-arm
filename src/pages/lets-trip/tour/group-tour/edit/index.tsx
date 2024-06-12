import { PageTitle } from '@/components';
import * as S from './styled';
import { LestTripTourEditForm } from '@/components/forms';

export const LetsTripGroupTourEdit = () => {
  return (
    <S.ViewStyled>
      <PageTitle title="Edit Group Tour" />
      <LestTripTourEditForm />
    </S.ViewStyled>
  );
};
