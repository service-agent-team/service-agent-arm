import { PageTitle } from '@/components';
import { useEffect } from 'react';
import * as S from './styled';
import { ROUTES } from '@/constants';
import { LestTripTourCreate } from '@/components/forms/lets-trip-tour/create';

export const LetsTripTourCreate = () => {
  useEffect(() => {}, []);
  return (
    <S.ViewStyled>
      <PageTitle
        title="Create Tour"
        icon="ArrowLeftOutlined"
        route={ROUTES.letsTripTour}
        label="Back"
      />
      {/* <VideoCard url={agent?.videoContentId} /> */}
      {/* <AgentCard data={agent} /> */}
      <LestTripTourCreate />
    </S.ViewStyled>
  );
};
