import { PageTitle } from '@/components';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { LestTripTransferCreateForm } from '@/components';

export const LetsTripTransferCreate = () => {
  return (
    <S.ViewStyled>
      <PageTitle
        title="Create Transfer"
        icon="ArrowLeftOutlined"
        route={ROUTES.letsTripTransfer}
        label="Back"
      />
      <LestTripTransferCreateForm />
    </S.ViewStyled>
  );
};
