import * as S from './styled';
import { LetsTripIndividualTourCard } from '@/components/cards/letstrip/individual-tour-card';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

export const LetsTripTourIndividualView = () => {
  const { geOneLetsTripIndividualTour } = useActions();
  const { individualTour } = useTypedSelector((state) => state.letsTripIndividualTour);
  const { id } = useParams();

  useEffect(() => {
    if (id) geOneLetsTripIndividualTour({ callback() {}, id });
  }, [id]);

  return (
    <S.ViewStyled>
      <LetsTripIndividualTourCard data={individualTour} />
    </S.ViewStyled>
  );
};
