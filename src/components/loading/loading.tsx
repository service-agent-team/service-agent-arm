import { Spin } from 'antd';
import * as S from './loading-styled';

export const Loading = () => (
  <S.loading>
    <Spin size="large" />
  </S.loading>
);
