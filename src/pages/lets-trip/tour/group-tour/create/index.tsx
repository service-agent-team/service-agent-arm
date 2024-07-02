import { LestTripTourCreateForm, PageTitle } from '@/components';
import * as S from './styled';

export const LetsTripTourGroupCreate = () => {
  return (
    <S.ViewStyled>
      <PageTitle title="Create Group Tour" label="Back" />
      <LestTripTourCreateForm />
    </S.ViewStyled>
  );
};
