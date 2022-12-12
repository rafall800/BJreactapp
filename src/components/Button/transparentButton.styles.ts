import { css } from '@emotion/react';
import { theme } from '../theme';

export const transparentButtonStyle = css`
  color: ${theme.colorStyles.White};
  background: transparent;
  font-size: ${theme.fontSize.FrontButtonMobile};
  text-transform: none;
  white-space: normal;

  max-height: none;
  border-radius: 0;
  padding: 20px 0;
  margin: 0;
  border: 0;
  :hover,
  :active {
    background: radial-gradient(circle, #fff9 0%, #fff0 100%);
    border-radius: 50%;
    text-shadow: ${theme.textOutlines.Light}, 0px 4px 4px rgba(0, 0, 0, 0.4);
  }
  @media (min-width: 964px) {
    font-size: ${theme.fontSize.FrontButton};
  }
`;
