import { css } from '@emotion/react';
import { theme } from '../theme';

export const tabButtonStyle = css`
  padding: 20px;

  width: 100%;

  background-color: transparent;
  color: ${theme.colorStyles.Black};

  border: 0;
  border-radius: 0;

  :hover {
    background-color: ${theme.colorStyles.Green2};
  }

  :active {
    background-color: ${theme.colorStyles.Green4};
  }

  :disabled {
    color: ${theme.colorStyles.Gray3};
    background-color: ${theme.colorStyles.Gray5};
  }
`;
