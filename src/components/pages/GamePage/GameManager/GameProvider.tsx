import { createContext, FC } from 'react';
import { DefaultProps } from '../../../util/types';
import { BlackJackGameInterface, useBlackJackGameState } from './useBlackJackGameState';
import { initialData } from './util';

export const BlackJackGameContext = createContext<BlackJackGameInterface>(initialData);

export const GameProvider: FC<DefaultProps> = ({ children }) => {
  const ctx = useBlackJackGameState(initialData);

  return <BlackJackGameContext.Provider value={ctx}>{children}</BlackJackGameContext.Provider>;
};
