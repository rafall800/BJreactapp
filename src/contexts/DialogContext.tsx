import { FC, createContext, useContext, useState } from 'react';

import { DefaultProps } from '../components/util/types';

interface DialogInterface {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const DialogContext = createContext<DialogInterface>({
  isOpen: false,
  open: () => undefined,
  close: () => undefined
});

export const DialogProvider: FC<DefaultProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const context: DialogInterface = {
    isOpen,
    open,
    close
  };

  return <DialogContext.Provider value={context}>{children}</DialogContext.Provider>;
};

export const useDialog = () => useContext(DialogContext);
