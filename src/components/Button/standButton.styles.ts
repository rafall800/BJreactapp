import { primaryButtonStyle } from './primaryButton.styles';
import { css } from '@emotion/react';
import { theme } from '../theme';

export const standButtonStyle = css`
  ${primaryButtonStyle};
  background-color: ${theme.colorStyles.Red3};
  :hover {
    background-color: ${theme.colorStyles.Red4};
  }

  :active {
    background-color: ${theme.colorStyles.Red4};
  }
`;
