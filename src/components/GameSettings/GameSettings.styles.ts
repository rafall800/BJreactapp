import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../theme';

interface ButtonWrapperProps {
  isActive: boolean;
}

export const StyledGameSettings = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  padding: 10px;
  background-color: ${theme.colorStyles.Gray1};
  border: 1px solid ${theme.colorStyles.Blue2};
  border-radius: 25px;
  margin: 50px 0;
`;

export const Speeds = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  button {
    padding: 5px;
    height: 100%;
    border-radius: 20px;
    border: 1px solid ${theme.colorStyles.Black};
    :hover {
      background-color: ${theme.colorStyles.Blue1};
    }
  }
`;

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  ${({ isActive }: ButtonWrapperProps) => css`
    ${isActive &&
    css`
      background-color: ${theme.colorStyles.Blue2};
      border-radius: 20px;
    `};
  `};
`;
