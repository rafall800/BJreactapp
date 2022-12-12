import { primaryButtonStyle } from './primaryButton.styles';
import { css } from '@emotion/react';
import { theme } from '../theme';

export const doubledownButtonStyle = css`
  ${primaryButtonStyle};
  background-color: ${theme.colorStyles.Purple1};
  :hover {
    background-color: ${theme.colorStyles.Purple2};
  }

  :active {
    background-color: ${theme.colorStyles.Purple2};
  }
`;
