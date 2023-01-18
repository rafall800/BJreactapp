import { theme } from './../theme';
import styled from '@emotion/styled';

export const TableTab = styled.h3`
  color: ${theme.colorStyles.White};
  font-size: ${theme.fontSize.TabMobile};
  font-weight: ${theme.fontWeight.Bold};
  @media (min-width: 1100px) {
    font-size: ${theme.fontSize.Tab};
  }
`;
