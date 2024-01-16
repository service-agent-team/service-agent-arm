import { Card } from '@/components/common/card';
import * as S from './styles';
export interface IProps {
  name: string;
}

export const CarModelCard = ({ name }: IProps) => {
  return (
    <Card width="200px" height="200px" color="#5afa32c8">
      <S.Text>{name}</S.Text>
      {/* <S.Navigate to={path}>Permission</S.Navigate> */}
    </Card>
  );
};
