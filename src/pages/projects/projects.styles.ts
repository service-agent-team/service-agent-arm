import { fon } from '@/assets';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: space-evenly;
  background: url(${fon});
  background-size: 100% 100%;
  background-repeat: repeat;
  background-position: center;
  padding: 100px;
`;

export const Title = styled.h1`
  font-size: 35px;
  top: 0;
  color: wheat;
  width: 100%;
  text-align: center;
`;
