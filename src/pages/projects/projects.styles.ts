import { fon } from '@/assets';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background: url(${fon});
  background-size: 100% 100%;
  background-repeat: repeat;
  background-position: center;
  padding: 100px;
`;
