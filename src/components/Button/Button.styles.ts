import { standButtonStyle } from './standButton.styles';
import { splitButtonStyle } from './splitButton.styles';
import { doubledownButtonStyle } from './doubledownButton.styles';
import { tabButtonStyle } from './tabButton.styles';
import { primaryButtonStyle } from './primaryButton.styles';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../theme';
import { transparentButtonStyle } from './transparentButton.styles';

interface ButtonProps {
  variant?: 'tab' | 'primary' | 'doubledown' | 'split' | 'stand' | 'transparent';
}

export const StyledButton = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 13px 20px 15px 20px;
  max-height: 50px;
  border-radius: 25px;

  font-size: ${theme.fontSize.Button};
  font-weight: ${theme.fontWeight.Bold};
  font-variant: ${theme.fontVariant.SmallCaps};

  ${({ variant }: ButtonProps) => css`
    ${variant === 'primary' && primaryButtonStyle};
    ${variant === 'tab' && tabButtonStyle};
    ${variant === 'transparent' && transparentButtonStyle};
    ${variant === 'doubledown' && doubledownButtonStyle};
    ${variant === 'split' && splitButtonStyle};
    ${variant === 'stand' && standButtonStyle};
  `};

  :hover {
    cursor: pointer;
  }
`;
