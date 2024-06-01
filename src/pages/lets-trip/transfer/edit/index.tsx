import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { LestTripTransferEditForm } from '@/components';

export const LetsTripTransferEdit = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Edit Transfer"
        icon="ArrowLeftOutlined"
        route={ROUTES.letsTripTransfer}
        label="Back"
      />
      <LestTripTransferEditForm />
    </S.ViewStyled>
  );
};
