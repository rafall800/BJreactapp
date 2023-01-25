import { createContext, FC } from 'react';
import { BlackJackGameInterface, useBlackJackGameState } from '../hooks/useBlackJackGameState';
import { initialData } from '../utils/consts';
import { DefaultProps } from '../utils/types';

export const BlackJackGameContext = createContext<BlackJackGameInterface>(initialData);

export const GameProvider: FC<DefaultProps> = ({ children }) => {
  const ctx = useBlackJackGameState(initialData);

  return <BlackJackGameContext.Provider value={ctx}>{children}</BlackJackGameContext.Provider>;
};
