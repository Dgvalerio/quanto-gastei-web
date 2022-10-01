import { darken, Theme } from '@mui/system';

import { css, SerializedStyles } from '@emotion/react';

const globalStyles = (theme: Theme): SerializedStyles => css`
  * {
    padding: 0;
    margin: 0;
    outline: none;
    font-family: Roboto, sans-serif;

    box-sizing: border-box;

    &::selection {
      background-color: ${theme.palette.primary.dark};
      color: ${theme.palette.primary.contrastText};
    }

    &::-webkit-scrollbar {
      height: 4px;
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background-color: ${darken(theme.palette.background.default, 0.2)};
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${darken(theme.palette.primary.dark, 0.4)};
      border-radius: 0.6rem;
    }
  }

  body {
    #__next {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
      max-width: 100vw;

      align-items: stretch;
      justify-content: stretch;
    }
  }

  button {
    cursor: pointer;
  }
`;

export default globalStyles;
