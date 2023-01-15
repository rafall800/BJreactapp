import { css } from '@emotion/react';
import { theme } from '../theme';

export const primaryButtonStyle = css`
  background-color: ${theme.colorStyles.Green4};
  color: ${theme.colorStyles.White};

  border: 2px solid transparent;

  :hover {
    background-color: ${theme.colorStyles.Green5};
  }

  :active {
    background-color: ${theme.colorStyles.Green5};
    border: 2px solid ${theme.colorStyles.Black};
  }

  :disabled {
    color: ${theme.colorStyles.Gray3};
    background-color: ${theme.colorStyles.Gray5};
  }
`;
