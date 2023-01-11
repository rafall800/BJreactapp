import { FC, ReactNode, useEffect, useRef } from 'react';

import { StyledBackdrop } from './Backdrop.styles';

interface BackdropProps {
  open: boolean;
  children: ReactNode;
}

const Backdrop: FC<BackdropProps> = ({ children, open }) => {
  const backdropRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (open && backdropRef.current) {
      backdropRef.current.style.opacity = '1';
      backdropRef.current.style.visibility = 'visible';
    } else if (!open && backdropRef.current) {
      backdropRef.current.style.opacity = '0';
      backdropRef.current.style.visibility = 'hidden';
    }
  });
  return <StyledBackdrop ref={backdropRef}>{children}</StyledBackdrop>;
};

export default Backdrop;
