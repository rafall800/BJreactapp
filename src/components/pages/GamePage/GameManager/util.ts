import { BlackJackGameInterface } from './useBlackJackGameState';
import { WithIdRaw } from '../../../util/types';

//TODO:

//fix surrender
//Add deviations
//hide dealer 2
//dodać artykuł jak grać, jak liczyć
//dodać ćwiczenia takie jak: zliczanie kart, podejmowanie decyzji
//zrobienie tabelki z statsami
//dodanie sesji
//dodanie logowania ? nie wiem po co; może zliczanie statystyk, możliwość zresetowania ich np staty performance z ćwiczonek, ilość kaski przegranej/zarobionej
//dodanie ustawień języka

export interface Card {
  isPrivate: boolean;
  symbol: string;
  value: 'A' | '10' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
}

export type WithIdCard = WithIdRaw<Card>;

export type Options = 'hit' | 'stand' | 'split' | 'doubleDown' | 'surrender';

export type Softs = '20' | '19' | '18' | '17' | '16' | '15' | '14' | '13';

export const cards: Card[] = [
  { isPrivate: false, symbol: 'AP', value: 'A' },
  { isPrivate: false, symbol: '2P', value: '2' },
  { isPrivate: false, symbol: '3P', value: '3' },
  { isPrivate: false, symbol: '4P', value: '4' },
  { isPrivate: false, symbol: '5P', value: '5' },
  { isPrivate: false, symbol: '6P', value: '6' },
  { isPrivate: false, symbol: '7P', value: '7' },
  { isPrivate: false, symbol: '8P', value: '8' },
  { isPrivate: false, symbol: '9P', value: '9' },
  { isPrivate: false, symbol: '10P', value: '10' },
  { isPrivate: false, symbol: 'JP', value: '10' },
  { isPrivate: false, symbol: 'QP', value: '10' },
  { isPrivate: false, symbol: 'KP', value: '10' },
  { isPrivate: false, symbol: 'AS', value: 'A' },
  { isPrivate: false, symbol: '2S', value: '2' },
  { isPrivate: false, symbol: '3S', value: '3' },
  { isPrivate: false, symbol: '4S', value: '4' },
  { isPrivate: false, symbol: '5S', value: '5' },
  { isPrivate: false, symbol: '6S', value: '6' },
  { isPrivate: false, symbol: '7S', value: '7' },
  { isPrivate: false, symbol: '8S', value: '8' },
  { isPrivate: false, symbol: '9S', value: '9' },
  { isPrivate: false, symbol: '10S', value: '10' },
  { isPrivate: false, symbol: 'JS', value: '10' },
  { isPrivate: false, symbol: 'QS', value: '10' },
  { isPrivate: false, symbol: 'KS', value: '10' },
  { isPrivate: false, symbol: 'AT', value: 'A' },
  { isPrivate: false, symbol: '2T', value: '2' },
  { isPrivate: false, symbol: '3T', value: '3' },
  { isPrivate: false, symbol: '4T', value: '4' },
  { isPrivate: false, symbol: '5T', value: '5' },
  { isPrivate: false, symbol: '6T', value: '6' },
  { isPrivate: false, symbol: '7T', value: '7' },
  { isPrivate: false, symbol: '8T', value: '8' },
  { isPrivate: false, symbol: '9T', value: '9' },
  { isPrivate: false, symbol: '10T', value: '10' },
  { isPrivate: false, symbol: 'JT', value: '10' },
  { isPrivate: false, symbol: 'QT', value: '10' },
  { isPrivate: false, symbol: 'KT', value: '10' },
  { isPrivate: false, symbol: 'AD', value: 'A' },
  { isPrivate: false, symbol: '2D', value: '2' },
  { isPrivate: false, symbol: '3D', value: '3' },
  { isPrivate: false, symbol: '4D', value: '4' },
  { isPrivate: false, symbol: '5D', value: '5' },
  { isPrivate: false, symbol: '6D', value: '6' },
  { isPrivate: false, symbol: '7D', value: '7' },
  { isPrivate: false, symbol: '8D', value: '8' },
  { isPrivate: false, symbol: '9D', value: '9' },
  { isPrivate: false, symbol: '10D', value: '10' },
  { isPrivate: false, symbol: 'JD', value: '10' },
  { isPrivate: false, symbol: 'QD', value: '10' },
  { isPrivate: false, symbol: 'KD', value: '10' }
];

export const initialData: BlackJackGameInterface = {
  gameRules: {
    soft17: true,
    decksNumber: 6,
    penetration: 0.75
  },
  setGameRules: () => undefined,
  gameRunning: false,
  setGameRunning: () => undefined,
  bettingStage: true,
  setBettingStage: () => undefined,
  splitHandStage: false,
  setSplitHandStage: () => undefined,
  bet: 0,
  setBet: () => undefined,
  balance: 1000,
  setBalance: () => undefined,
  players: [
    {
      seatTaken: false,
      isPlaying: false,
      hand: [],
      bet: 0,
      outcome: undefined,
      betOutcome: 0,
      canSplit: false,
      canDoubledown: true,
      canGetBlackJack: true,
      canSurrender: true,
      splitHands: [],
      playerName: 'player1'
    },
    {
      seatTaken: false,
      isPlaying: false,
      hand: [],
      bet: 0,
      betOutcome: 0,
      outcome: undefined,
      canSplit: false,
      canDoubledown: true,
      canGetBlackJack: true,
      canSurrender: true,
      splitHands: [],
      playerName: 'player2'
    },
    {
      seatTaken: true,
      isPlaying: false,
      hand: [],
      bet: 0,
      betOutcome: 0,
      outcome: undefined,
      canSplit: false,
      canDoubledown: true,
      canGetBlackJack: true,
      canSurrender: true,
      splitHands: [],
      playerName: 'player3'
    },
    {
      seatTaken: false,
      isPlaying: false,
      hand: [],
      bet: 0,
      betOutcome: 0,
      outcome: undefined,
      canSplit: false,
      canDoubledown: true,
      canGetBlackJack: true,
      canSurrender: true,
      splitHands: [],
      playerName: 'player4'
    },
    {
      seatTaken: false,
      isPlaying: false,
      hand: [],
      bet: 0,
      betOutcome: 0,
      outcome: undefined,
      canSplit: false,
      canDoubledown: true,
      canGetBlackJack: true,
      canSurrender: true,
      splitHands: [],
      playerName: 'player5'
    }
  ],
  setPlayers: () => undefined,
  handleSeatAvailability: () => undefined,
  handleSetupPlayers: () => undefined,
  handlePlayerBet: () => undefined,
  handlePlayerHit: () => undefined,
  handlePlayerStand: () => undefined,
  handlePlayerDoubledown: () => undefined,
  handlePlayerSplit: () => undefined,
  handlePlayerSurrender: () => undefined,
  dealer: [],
  setDealer: () => undefined,
  shoe: [],
  setShoe: () => undefined,
  dealtCardsAmount: 0,
  setDealtCardsAmount: () => undefined,
  penetrationReached: false,
  setPenetrationReached: () => undefined,
  isNewGame: true,
  setIsNewGame: () => undefined,
  dealSpeed: 0.5,
  gameData: [],
  setGameData: () => undefined,
  runningCount: 0,
  setRunningCount: () => undefined,
  setDealSpeed: () => undefined,
  dealCard: () => [],
  startGame: () => undefined,
  startDeal: () => undefined,
  countDealerValue: () => 0
};

export const shuffleCards = (decksNumber: number): WithIdCard[] => {
  return Array(decksNumber)
    .fill(cards)
    .reduce<Card[]>((acc, curr) => acc.concat(curr), [])
    .sort(() => Math.random() - 0.5)
    .map((card, index) => ({ ...card, _id: index.toString() }));
};

export const countHandValue = (cards: WithIdCard[]): number => {
  let AcesNumber = 0;

  let playerValue = cards.reduce((acc, curr) => {
    if (curr.isPrivate) return acc;
    if (curr.value === 'A') {
      AcesNumber++;
      return acc;
    }
    return acc + Number(curr.value);
  }, 0);
  for (let i = 0; i < AcesNumber; i++) {
    playerValue + 11 > 21 ? (playerValue = playerValue + 1) : (playerValue = playerValue + 11);
  }
  return playerValue;
};

export const getCardCount = (card: WithIdCard): number => {
  if (['A', '10'].includes(card.value)) return -1;
  if (Number(card.value) <= 6) return 1;
  return 0;
};

export function findLastIndex<T>(array: Array<T>, predicate: (value: T, index?: number, obj?: T[]) => boolean): number {
  let l = array.length;
  while (l--) {
    if (predicate(array[l]!, l, array)) return l;
  }
  return -1;
}

//BS
export const BASIC_STRATEGY_SPLITS = {
  A: { '2': 'y', '3': 'y', '4': 'y', '5': 'y', '6': 'y', '7': 'y', '8': 'y', '9': 'y', '10': 'y', A: 'y' },
  '10': { '2': 'n', '3': 'n', '4': 'n', '5': 'n', '6': 'n', '7': 'n', '8': 'n', '9': 'n', '10': 'n', A: 'n' },
  '9': { '2': 'y', '3': 'y', '4': 'y', '5': 'y', '6': 'y', '7': 'n', '8': 'y', '9': 'y', '10': 'n', A: 'n' },
  '8': { '2': 'y', '3': 'y', '4': 'y', '5': 'y', '6': 'y', '7': 'y', '8': 'y', '9': 'y', '10': 'y', A: 'y' },
  '7': { '2': 'y', '3': 'y', '4': 'y', '5': 'y', '6': 'y', '7': 'y', '8': 'n', '9': 'n', '10': 'n', A: 'n' },
  '6': { '2': 'y', '3': 'y', '4': 'y', '5': 'y', '6': 'y', '7': 'n', '8': 'n', '9': 'n', '10': 'n', A: 'n' },
  '5': { '2': 'n', '3': 'n', '4': 'n', '5': 'n', '6': 'n', '7': 'n', '8': 'n', '9': 'n', '10': 'n', A: 'n' },
  '4': { '2': 'n', '3': 'n', '4': 'n', '5': 'y', '6': 'y', '7': 'n', '8': 'n', '9': 'n', '10': 'n', A: 'n' },
  '3': { '2': 'y', '3': 'y', '4': 'y', '5': 'y', '6': 'y', '7': 'y', '8': 'n', '9': 'n', '10': 'n', A: 'n' },
  '2': { '2': 'y', '3': 'y', '4': 'y', '5': 'y', '6': 'y', '7': 'y', '8': 'n', '9': 'n', '10': 'n', A: 'n' }
};

export const BASIC_STRATEGY_SOFT: any = {
  '21': { '2': 's', '3': 's', '4': 's', '5': 's', '6': 's', '7': 's', '8': 's', '9': 's', '10': 's', A: 's' },
  '20': { '2': 's', '3': 's', '4': 's', '5': 's', '6': 's', '7': 's', '8': 's', '9': 's', '10': 's', A: 's' },
  '19': { '2': 's', '3': 's', '4': 's', '5': 's', '6': 'Ds', '7': 's', '8': 's', '9': 's', '10': 's', A: 's' },
  '18': { '2': 'Ds', '3': 'Ds', '4': 'Ds', '5': 'Ds', '6': 'Ds', '7': 's', '8': 's', '9': 'h', '10': 'h', A: 'h' },
  '17': { '2': 'h', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'h', '8': 'h', '9': 'h', '10': 'h', A: 'h' },
  '16': { '2': 'h', '3': 'h', '4': 'D', '5': 'D', '6': 'D', '7': 'h', '8': 'h', '9': 'h', '10': 'h', A: 'h' },
  '15': { '2': 'h', '3': 'h', '4': 'D', '5': 'D', '6': 'D', '7': 'h', '8': 'h', '9': 'h', '10': 'h', A: 'h' },
  '14': { '2': 'h', '3': 'h', '4': 'h', '5': 'D', '6': 'D', '7': 'h', '8': 'h', '9': 'h', '10': 'h', A: 'h' },
  '13': { '2': 'h', '3': 'h', '4': 'h', '5': 'D', '6': 'D', '7': 'h', '8': 'h', '9': 'h', '10': 'h', A: 'h' }
};

export const BASIC_STRATEGY_HARD: any = {
  '21': { '2': 's', '3': 's', '4': 's', '5': 's', '6': 's', '7': 's', '8': 's', '9': 's', '10': 's', A: 's' },
  '20': { '2': 's', '3': 's', '4': 's', '5': 's', '6': 's', '7': 's', '8': 's', '9': 's', '10': 's', A: 's' },
  '19': { '2': 's', '3': 's', '4': 's', '5': 's', '6': 's', '7': 's', '8': 's', '9': 's', '10': 's', A: 's' },
  '18': { '2': 's', '3': 's', '4': 's', '5': 's', '6': 's', '7': 's', '8': 's', '9': 's', '10': 's', A: 's' },
  '17': { '2': 's', '3': 's', '4': 's', '5': 's', '6': 's', '7': 's', '8': 's', '9': 's', '10': 's', A: 's' },
  '16': { '2': 's', '3': 's', '4': 's', '5': 's', '6': 's', '7': 'h', '8': 'h', '9': 'h', '10': 'h', A: 'h' },
  '15': { '2': 's', '3': 's', '4': 's', '5': 's', '6': 's', '7': 'h', '8': 'h', '9': 'h', '10': 'h', A: 'h' },
  '14': { '2': 's', '3': 's', '4': 's', '5': 's', '6': 's', '7': 'h', '8': 'h', '9': 'h', '10': 'h', A: 'h' },
  '13': { '2': 's', '3': 's', '4': 's', '5': 's', '6': 's', '7': 'h', '8': 'h', '9': 'h', '10': 'h', A: 'h' },
  '12': { '2': 'h', '3': 'h', '4': 's', '5': 's', '6': 's', '7': 'h', '8': 'h', '9': 'h', '10': 'h', A: 'h' },
  '11': { '2': 'D', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'D', '8': 'D', '9': 'D', '10': 'D', A: 'D' },
  '10': { '2': 'D', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'D', '8': 'D', '9': 'D', '10': 'h', A: 'h' },
  '9': { '2': 'h', '3': 'D', '4': 'D', '5': 'D', '6': 'D', '7': 'h', '8': 'h', '9': 'h', '10': 'h', A: 'h' },
  '8': { '2': 'h', '3': 'h', '4': 'h', '5': 'h', '6': 'h', '7': 'h', '8': 'h', '9': 'h', '10': 'h', A: 'h' },
  '7': { '2': 'h', '3': 'h', '4': 'h', '5': 'h', '6': 'h', '7': 'h', '8': 'h', '9': 'h', '10': 'h', A: 'h' },
  '6': { '2': 'h', '3': 'h', '4': 'h', '5': 'h', '6': 'h', '7': 'h', '8': 'h', '9': 'h', '10': 'h', A: 'h' },
  '5': { '2': 'h', '3': 'h', '4': 'h', '5': 'h', '6': 'h', '7': 'h', '8': 'h', '9': 'h', '10': 'h', A: 'h' }
};
