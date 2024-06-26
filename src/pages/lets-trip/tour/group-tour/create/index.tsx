import { LestTripTourCreateForm, PageTitle } from '@/components';
import { useTypedSelector } from '@/common/hooks';
import * as S from './styled';

export const LetsTripTourGroupCreate = () => {
  const { content } = useTypedSelector((state) => state.app);

  return (
    <S.ViewStyled>
      <PageTitle title="Create Group Tour" label="Back" />
      <LestTripTourCreateForm />
      {/* <TextEditor onSubmit={() => console.log(content)} /> */}
      {content}
    </S.ViewStyled>
  );
};
