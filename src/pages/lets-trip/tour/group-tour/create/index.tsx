import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { LestTripTourCreateForm } from '@/components/forms';
import { useParams } from 'react-router-dom';

export const LetsTripTourGroupCreate = () => {
  const { countryId } = useParams();

  return (
    <S.ViewStyled>
      <PageTitle title="Create Group Tour" label="Back" />
      <LestTripTourCreateForm />
    </S.ViewStyled>
  );
};
