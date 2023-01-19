import { useState } from 'react';

interface DialogInterface {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useDialog = (): DialogInterface => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    isOpen,
    open,
    close
  };
};
