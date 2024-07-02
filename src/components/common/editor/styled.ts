import styled from 'styled-components';

export const DarkModeWrapper = styled.div`
  .sun-editor {
    background-color: #333;
    color: #ddd;
  }

  .se-wrapper-inner,
  .se-resizing-bar {
    background-color: #141414 !important;
    color: #ddd !important;
  }

  .se-toolbar {
    background-color: #444;
    border-color: #555;
  }

  .se-toolbar button {
    color: #ddd;
  }

  .se-toolbar button:hover {
    background-color: #555;
  }

  .se-container {
    background-color: #333;
    color: #ddd;
  }

  .se-wrapper {
    border-color: #555;
  }

  .se-wrapper input,
  .se-wrapper textarea {
    background-color: #444;
    color: #ddd;
    border-color: #555;
  }

  .se-wrapper input::placeholder,
  .se-wrapper textarea::placeholder {
    color: #bbb;
  }

  .se-code-view {
    background-color: #333;
    color: #ddd;
  }
`;
