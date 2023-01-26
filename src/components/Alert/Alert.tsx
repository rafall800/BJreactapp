import { FC } from 'react';
import { StyledAlert } from './Alert.styles';

interface AlertProps {
  variant: 'good' | 'bad';
  children?: React.ReactNode;
}

const Alert: FC<AlertProps> = ({ children, variant }) => {
  return <StyledAlert variant={variant}>{children}</StyledAlert>;
};

export default Alert;
