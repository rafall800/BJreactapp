import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { theme } from '../../../components/theme';

interface AlerProps {
  variant: 'good' | 'bad';
}

export const StyledCardCountingExercise = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 100px;
  max-width: 1440px;
  min-height: 850px;
`;

export const SingleCardPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 90px;
  height: 131px;
  border: 3px solid rgba(255, 255, 255, 0.39);
  border-radius: 11px;

  @media (min-width: 1100px) {
    width: 110px;
    height: 161px;
    border-radius: 13px;
  }
`;

export const ButtonBox = styled.div`
  display: flex;
  gap: 20px;
`;

export const Alert = styled.div<AlerProps>`
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
