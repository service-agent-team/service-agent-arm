import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  :root {
    --ss: 0.5rem; // 8px
    --xs: 0.75rem; // 12px
    --sm: 0.875rem; // 14px
    --base: 1rem; // 16px
    --lg: 1.125rem; // 18px
    --xl: 1.25rem; // 20px
    --2xl: 1.5rem; // 24px
    --3xl: 2rem; // 32px
    --full: 100%;
  }

  * {
    box-sizing: border-box;
    font-family: Inter, sans-serif;
    font-weight: 400;
  }

  html, body, body div, span, object, iframe, h1, h2, h3, h4, h5, h6, p, img, ul, li, ol, a {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-weight: normal;
    vertical-align: baseline;
    background: transparent;
  }

  body {
    font-size: var(--base);
  }

  #root {
    height: 100%;
  }

  svg:not([fill]) {
    fill: currentColor;
  }

  ul {
    list-style-type: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    appearance: none;
    margin: 0;
  }
`;
