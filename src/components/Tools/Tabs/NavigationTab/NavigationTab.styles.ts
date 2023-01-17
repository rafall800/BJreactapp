import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../../../theme';

interface StyledNavigationTabProps {
  active: boolean;
}

export const StyledNavigationTab = styled.li<StyledNavigationTabProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  h2 {
    color: white;
  }

  ${({ active }: StyledNavigationTabProps) => css`
    ${active &&
    css`
      background-color: ${theme.colorStyles.Gray4};
    `};
  `};
  :hover {
    cursor: pointer;
  }
`;
