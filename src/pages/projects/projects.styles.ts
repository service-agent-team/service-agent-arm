import { fon } from '@/assets';
import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 100%;
  /* height: 100vh; */
  /* background-color: #1f2d40; */
  /* background: url(${fon});
  background-size: 100% 100vh !important;
  background-repeat: repeat;
  background-position: center;
  background-attachment: fixed; */
  padding: 100px;
`;

export const Title = styled.h1`
  font-size: 35px;
  color: #1976d2;
  width: 100%;
  text-align: center;
  font-weight: bold !important;
  margin-bottom: 30px !important;
`;

export const Shadow = styled.div`
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 10px 50px;
`;
