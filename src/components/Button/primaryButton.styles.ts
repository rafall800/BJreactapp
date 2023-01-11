import { css } from '@emotion/react';
import { theme } from '../theme';

export const primaryButtonStyle = css`
  background-color: ${theme.colorStyles.Green3};
  color: ${theme.colorStyles.White};

  border: 2px solid transparent;

  :hover {
    background-color: ${theme.colorStyles.Green4};
  }

  :active {
    background-color: ${theme.colorStyles.Green4};
    border: 2px solid ${theme.colorStyles.Black};
  }

  :disabled {
    color: ${theme.colorStyles.Gray2};
    background-color: ${theme.colorStyles.Gray4};
  }
`;
