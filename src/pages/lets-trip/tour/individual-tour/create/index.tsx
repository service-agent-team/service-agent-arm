import { PageTitle, LestTripIndividualTourCreateForm } from '@/components';
import * as S from './styled';

export const LetsTripTourIndividualCreate = () => {
  return (
    <S.ViewStyled>
      <PageTitle title="Create Individual Tour" icon="ArrowLeftOutlined" label="Back" />
      <LestTripIndividualTourCreateForm />
    </S.ViewStyled>
  );
};
