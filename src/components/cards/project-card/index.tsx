import { SimpleButton } from '@/components/common/buttons';
import { Card } from '@/components/common/card';
import * as S from './styles';
export interface IProps {
  name: string;
  path: string;
}

export const ProjectCard = ({ name, path }: IProps) => {
  return (
    <Card width="400px">
      <S.Text>{name}</S.Text>
      <SimpleButton color="primary" to={path} width="360px">
        Permission
      </SimpleButton>
    </Card>
  );
};
