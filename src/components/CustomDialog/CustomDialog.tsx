import { FC, ReactNode } from 'react';
import Backdrop from '../Backdrop/Backdrop';
import { StyledCustomDialog } from './CustomDialog.styles';

interface CustomDialogProps {
  open: boolean;
  children?: ReactNode;
}

const CustomDialog: FC<CustomDialogProps> = ({ children, open }) => {
  return (
    <Backdrop open={open}>
      <StyledCustomDialog open={open}>{children}</StyledCustomDialog>
    </Backdrop>
  );
};

export default CustomDialog;
