import { theme } from '../theme';
import styled from '@emotion/styled';

export const Header2 = styled.h2`
  color: ${theme.colorStyles.Black};
  font-size: ${theme.fontSize.H2Mobile};
  font-weight: ${theme.fontWeight.Bold};
  text-transform: ${theme.fontVariant.Caps};
  @media (min-width: 1100px) {
    font-size: ${theme.fontSize.H2};
  }
`;
