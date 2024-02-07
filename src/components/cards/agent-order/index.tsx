import { Card } from '@/components/common/card';
import * as S from './styles';
import { Tag } from 'antd';
export interface IProps {
  name: string;
}

export const AgentOrderCard = ({ name }: IProps) => {
  return (
    <Card width="200px" height="200px" color="#5afa32c8">
      <S.Text>{name}</S.Text>
      <Tag color="#87d068">Active</Tag>
      {/* <S.Navigate to={path}>Permission</S.Navigate> */}
    </Card>
  );
};
