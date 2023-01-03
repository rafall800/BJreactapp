import { createContext } from 'react';
import { BlackJackGameInterface } from './useBlackJackGameState';

export const BlackJackGameContext = createContext<BlackJackGameInterface>({
  bet: 0,
  setBet: () => undefined,
  balance: 1000,
  setBalance: () => undefined,
  players: [
    { isPlaying: false, hand: [] },
    { isPlaying: false, hand: [] },
    { isPlaying: true, hand: [] },
    { isPlaying: false, hand: [] },
    { isPlaying: false, hand: [] }
  ],
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
