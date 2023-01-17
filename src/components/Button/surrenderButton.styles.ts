import { primaryButtonStyle } from './primaryButton.styles';
import { css } from '@emotion/react';
import { theme } from '../theme';

export const surrenderButtonStyle = css`
  ${primaryButtonStyle};
  background-color: ${theme.colorStyles.Orange1};
  :hover {
    background-color: ${theme.colorStyles.Orange2};
  }

  :active {
    background-color: ${theme.colorStyles.Orange2};
  }
`;
