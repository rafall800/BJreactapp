import { FC } from 'react';
import { BlackJackGameContext } from './BlackJackGameContext';
import { useBlackJackGameState } from './useBlackJackGameState';

type Props = {
  children?: React.ReactNode;
};

export const GameProvider: FC<Props> = ({ children }) => {
  const ctx = useBlackJackGameState({
    bet: 0,
    setBet: () => undefined,
    balance: 1000,
    setBalance: () => undefined,
    players: [{ seat: 1, hand: [] }],
    setPlayers: () => undefined,
    dealer: [],
    setDealer: () => undefined,
    deck: [],
    setDeck: () => undefined,
    isNewGame: true,
    setIsNewGame: () => undefined,
    dealCard: () => [],
    startGame: () => undefined,
    startDeal: () => undefined
  });

  return <BlackJackGameContext.Provider value={ctx}>{children}</BlackJackGameContext.Provider>;
};
