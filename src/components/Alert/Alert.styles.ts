import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../theme';

interface AlerProps {
  variant: 'good' | 'bad';
}

export const StyledAlert = styled.div<AlerProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 250px;
  height: 70px;
  ${({ variant }: AlerProps) => css`
    ${variant === 'bad' &&
    css`
      background-color: ${theme.colorStyles.Red2};
    `};
    ${variant === 'good' &&
    css`
      background-color: ${theme.colorStyles.Green1};
    `};
  `};
  color: ${theme.colorStyles.White};
  font-size: ${theme.fontSize.H2};
  border-radius: 25px;
`;
