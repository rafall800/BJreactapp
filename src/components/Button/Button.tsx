import React, { FC } from 'react';
import { StyledButton } from './Button.styles';

interface ButtonProps {
  variant?: 'tab' | 'primary' | 'doubledown' | 'split' | 'stand' | 'transparent';
}

const Button: FC<ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>> = ({
  onClick,
  variant,
  children,
  id,
  type
}) => {
  return (
    <StyledButton id={id} onClick={onClick} variant={variant} type={type}>
      {children}
    </StyledButton>
  );
};

export default Button;
