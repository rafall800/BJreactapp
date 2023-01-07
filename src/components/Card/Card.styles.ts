import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../theme';

interface CardProps {
  number: number;
}

export const StyledCard = styled.div<CardProps>`
  position: absolute;
  ${({ number }: CardProps) => css`
    top: ${number * -5}px;
    left: ${number * 15}px;
  `};
  width: 100%;
  #frontCard {
    border: 1px solid ${theme.colorStyles.Black};
    border-radius: 8px;
  }
  svg {
    width: 100%;
    height: 100%;
    @media (min-width: 1100px) {
      border-radius: 10px;
    }
  }
`;
