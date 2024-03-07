import { Card } from 'antd';
import * as S from './styles';
export interface IProps {
  name: string;
  title: string;
}

export const LetstripMiniCard = ({ name, title }: IProps) => {
  return (
    <Card size="small" title={title} style={{ background: '#5800FF', color: 'white' }}>
      <S.Text>{name}</S.Text>
    </Card>
  );
};
