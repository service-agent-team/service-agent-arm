import { media } from '@/common';
import styled from 'styled-components';

export const Block = styled.div`
  display: flex;
  justify-content: space-between;

  .chart-container {
    position: relative;
    width: 100%;
    height: auto;
  }

  canvas {
    max-width: 100% !important;
    max-height: 850px !important;
    width: 100% !important;
    height: 100% !important;
  }

  ${media.md} {
    display: block;
    background-color: #000;
  }
`;
