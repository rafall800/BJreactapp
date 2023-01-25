import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../../../../../../components/theme';

interface MoveProps {
  isCorrect: boolean;
}

export const StyledTable = styled.table`
  width: 100%;
  thead {
    color: ${theme.colorStyles.White};
    background-color: ${theme.colorStyles.Gray6};
    height: 30px;
    text-transform: ${theme.fontVariant.Caps};
    th {
      vertical-align: middle;
    }
  }
`;

export const StyledMove = styled.tr<MoveProps>`
  height: 42px;
  th {
    vertical-align: middle;
  }
  ${({ isCorrect }: MoveProps) => css`
    ${isCorrect &&
    css`
      background-color: ${theme.colorStyles.Green1};
    `};
    ${!isCorrect &&
    css`
      background-color: ${theme.colorStyles.Red1};
    `};
  `};
`;
