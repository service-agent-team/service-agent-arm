import { Card } from '@/components/common/card';
import * as S from './styles';
export interface IProps {
  name: string;
  path: string;
}

export const ProjectCard = ({ name, path }: IProps) => {
  return (
    <Card width="100%" height="200px">
      <S.Text>{name.toUpperCase()}</S.Text>
      <S.Navigate to={path}>Permission</S.Navigate>
    </Card>
  );
};
