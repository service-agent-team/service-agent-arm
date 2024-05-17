import * as S from './styles';
export interface IProps {
  name: string;
  title: string;
}

export const LetstripMiniCard = ({ name, title }: IProps) => {
  return (
    <S.CustomCard size="small" title={title} style={{ background: '#3a57e8', color: '#ffffff' }}>
      <S.Text>{name}</S.Text>
    </S.CustomCard>
  );
};
