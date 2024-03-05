import styled from 'styled-components';
const primaryColor = '';
const btnColor = '#1976D2';
import { Link } from 'react-router-dom';

export const Text = styled.p`
  font-size: 25px;
  color: ${btnColor};
  margin-bottom: 20px;
  text-align: center;
  width: 100%;
  padding: 10px 0px;
  border-radius: 10px;
  background-color: ${primaryColor};
  font-weight: 700;
`;

export const Navigate = styled(Link)`
  width: 350px;
  height: 50px;
  font-size: large;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${btnColor};
  border-radius: 10px;
  color: white;
`;
