import { primaryButtonStyle } from './primaryButton.styles';
import { css } from '@emotion/react';
import { theme } from '../theme';

export const splitButtonStyle = css`
  ${primaryButtonStyle};
  background-color: ${theme.colorStyles.Blue1};
  :hover {
    background-color: ${theme.colorStyles.Blue2};
  }

  :active {
    background-color: ${theme.colorStyles.Blue2};
  }
`;
