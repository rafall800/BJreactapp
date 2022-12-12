import { theme } from './../theme';
import styled from '@emotion/styled';

export const Header1 = styled.h1`
  color: ${theme.colorStyles.Black};
  font-size: ${theme.fontSize.H1Mobile};
  font-weight: ${theme.fontWeight.Black};
  text-transform: ${theme.fontVariant.Caps};
  @media (min-width: 964px) {
    font-size: ${theme.fontSize.H1};
  }
`;
