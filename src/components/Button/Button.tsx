import React, { FC } from 'react';
import { StyledButton } from './Button.styles';

interface ButtonProps {
  variant?: 'tab' | 'primary' | 'doubledown' | 'split' | 'stand' | 'transparent';
}

const Button: FC<ButtonProps & React.HTMLAttributes<HTMLButtonElement>> = ({ onClick, variant, children, id }) => {
  return (
    <StyledButton id={id} onClick={onClick} variant={variant}>
      {children}
    </StyledButton>
  );
};

export default Button;
