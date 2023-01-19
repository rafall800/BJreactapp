import { theme } from './../theme';
import styled from '@emotion/styled';

export const Header3 = styled.h3`
  color: ${theme.colorStyles.White};
  font-size: ${theme.fontSize.H3Mobile};
  font-weight: ${theme.fontWeight.Bold};
  text-transform: ${theme.fontVariant.Caps};
  @media (min-width: 1100px) {
    font-size: ${theme.fontSize.H3};
  }
`;
