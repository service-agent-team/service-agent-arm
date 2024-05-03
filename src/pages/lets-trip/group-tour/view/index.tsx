import * as S from './styled';
import { useEffect } from 'react';
import { useActions, useTypedSelector } from '@/common/hooks';
import { useParams } from 'react-router-dom';
import { LetsTripGroupTourCard } from '@/components/cards/letstrip/group-tour-card';

export const LetsTripTourGroupView = () => {
  const { getOneLetsTripTour } = useActions();
  const { groupTour } = useTypedSelector((state) => state.letsTripTour);
  const { id } = useParams();

  useEffect(() => {
    if (id) getOneLetsTripTour({ callback() {}, id });
  }, [id]);

  return (
    <S.ViewStyled>
      <LetsTripGroupTourCard data={groupTour} />
    </S.ViewStyled>
  );
};
