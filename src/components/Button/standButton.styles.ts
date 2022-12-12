import { primaryButtonStyle } from './primaryButton.styles';
import { css } from '@emotion/react';
import { theme } from '../theme';

export const standButtonStyle = css`
  ${primaryButtonStyle};
  background-color: ${theme.colorStyles.Red1};
  :hover {
    background-color: ${theme.colorStyles.Red2};
  }

  :active {
    background-color: ${theme.colorStyles.Red2};
  }
`;
