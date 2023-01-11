import { BlackJackGameInterface } from './useBlackJackGameState';
import { WithIdRaw } from '../../../util/types';

export interface Card {
  value: string;
  isPrivate: boolean;
}

export type WithIdCard = WithIdRaw<Card>;

export const cards: Card[] = [
  { isPrivate: false, value: 'AP' },
  { isPrivate: false, value: '2P' },
  { isPrivate: false, value: '3P' },
  { isPrivate: false, value: '4P' },
  { isPrivate: false, value: '5P' },
  { isPrivate: false, value: '6P' },
  { isPrivate: false, value: '7P' },
  { isPrivate: false, value: '8P' },
  { isPrivate: false, value: '9P' },
  { isPrivate: false, value: '10P' },
  { isPrivate: false, value: 'JP' },
  { isPrivate: false, value: 'QP' },
  { isPrivate: false, value: 'KP' },
  { isPrivate: false, value: 'AS' },
  { isPrivate: false, value: '2S' },
  { isPrivate: false, value: '3S' },
  { isPrivate: false, value: '4S' },
  { isPrivate: false, value: '5S' },
  { isPrivate: false, value: '6S' },
  { isPrivate: false, value: '7S' },
  { isPrivate: false, value: '8S' },
  { isPrivate: false, value: '9S' },
  { isPrivate: false, value: '10S' },
  { isPrivate: false, value: 'JS' },
  { isPrivate: false, value: 'QS' },
  { isPrivate: false, value: 'KS' },
  { isPrivate: false, value: 'AT' },
  { isPrivate: false, value: '2T' },
  { isPrivate: false, value: '3T' },
  { isPrivate: false, value: '4T' },
  { isPrivate: false, value: '5T' },
  { isPrivate: false, value: '6T' },
  { isPrivate: false, value: '7T' },
  { isPrivate: false, value: '8T' },
  { isPrivate: false, value: '9T' },
  { isPrivate: false, value: '10T' },
  { isPrivate: false, value: 'JT' },
  { isPrivate: false, value: 'QT' },
  { isPrivate: false, value: 'KT' },
  { isPrivate: false, value: 'AD' },
  { isPrivate: false, value: '2D' },
  { isPrivate: false, value: '3D' },
  { isPrivate: false, value: '4D' },
  { isPrivate: false, value: '5D' },
  { isPrivate: false, value: '6D' },
  { isPrivate: false, value: '7D' },
  { isPrivate: false, value: '8D' },
  { isPrivate: false, value: '9D' },
  { isPrivate: false, value: '10D' },
  { isPrivate: false, value: 'JD' },
  { isPrivate: false, value: 'QD' },
  { isPrivate: false, value: 'KD' }
];

export const initialData: BlackJackGameInterface = {
  gameRules: {
    soft17: true,
    decksNumber: 6
  },
  setGameRules: () => undefined,
  gameRunning: false,
  setGameRunning: () => undefined,
  bettingStage: true,
  setBettingStage: () => undefined,
  bet: 0,
  setBet: () => undefined,
  balance: 1000,
  setBalance: () => undefined,
  players: [
    { seatTaken: false, isPlaying: false, hand: [], bet: 0, outcome: undefined },
    { seatTaken: false, isPlaying: false, hand: [], bet: 0, outcome: undefined },
    { seatTaken: true, isPlaying: false, hand: [], bet: 0, outcome: undefined },
    { seatTaken: false, isPlaying: false, hand: [], bet: 0, outcome: undefined },
    { seatTaken: false, isPlaying: false, hand: [], bet: 0, outcome: undefined }
  ],
  setPlayers: () => undefined,
  handleSeatAvailability: () => undefined,
  handleSetupPlayers: () => undefined,
  handlePlayerBet: () => undefined,
  handlePLayerHit: () => undefined,
  handlePLayerStand: () => undefined,
  dealer: [],
  setDealer: () => undefined,
  shoe: [],
  setShoe: () => undefined,
  isNewGame: true,
  setIsNewGame: () => undefined,
  dealSpeed: 0.5,
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

export const countPlayerValue = (cards: WithIdCard[]): number => {
  let AcesNumber = 0;

  let playerValue = cards.reduce((acc, curr) => {
    if (curr.isPrivate) return acc;
    if (curr.value.slice(0, -1) === 'A') {
      AcesNumber++;
      return acc;
    }
    if (['J', 'Q', 'K'].includes(curr.value.slice(0, -1))) return acc + 10;
    return acc + Number(curr.value.slice(0, -1));
  }, 0);
  for (let i = 0; i < AcesNumber; i++) {
    playerValue + 11 > 21 ? (playerValue = playerValue + 1) : (playerValue = playerValue + 11);
  }
  return playerValue;
};
