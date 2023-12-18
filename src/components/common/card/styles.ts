import styled from 'styled-components';
import { Card as AntCard } from 'antd';

interface CardInternalProps {
  $padding?: string | number | [number, number];
  $with: string | number;
  $opasity?: string;
  $color?: string;
}

const rgb = 'rgba(255, 255, 255, 0.58)';

export const Card = styled(AntCard)<CardInternalProps>`
  background: ${(props) => (props.$color ? props.$color : rgb)};
  width: ${(props) => props.$with};
  padding: ${(props) => (props.$padding ? props.$padding : '5px')};
  opacity: ${(props) => (props.$opasity ? props.$opasity : '100%')};
  display: flex;
  flex-direction: column;
  align-items: center;
`;
