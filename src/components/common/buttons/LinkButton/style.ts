import styled from 'styled-components';
const btnColor = '#1976D2';
import { Link } from 'react-router-dom';

export const Navigate = styled(Link)`
  min-width: 80px;

  font-size: large;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid ${btnColor};
  border-radius: 10px;
  color: ${btnColor};
  padding: 10px 10px 10px 10px;
`;
