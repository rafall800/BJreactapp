import { cards } from './consts';
import { WithIdCard, Card, Options } from './types';

export const getRandomIntInclusive = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
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

export const getCards = (cardsToGet: string[]): WithIdCard[] => {
  const searchedCards = cards.filter((card) => {
    return cardsToGet.includes(card.symbol);
  });
  const withIdSearchedCards: WithIdCard[] = searchedCards.map((card, index) => {
    return { ...card, _id: index.toString() };
  });
  return withIdSearchedCards;
};

export const checkDeviation = (chart: any, dealerVal: string, playerVal: string, trueCount: number): Options => {
  let option = '';
  let bestOption: Options = '';
  if (!(playerVal in chart)) {
    return '';
  }
  if (!(dealerVal in chart[playerVal])) {
    return '';
  }
  const split = chart[playerVal][dealerVal].split(' ');
  const sign = split[0].slice(-1);
  const trueCountTreshold = split[0].slice(0, -1);
  if (sign === '+') {
    trueCount >= Number(trueCountTreshold) ? (option = split[1]) : (option = '');
  } else if (sign === '-') {
    trueCount <= Number(trueCountTreshold) ? (option = split[1]) : (option = '');
  }
  switch (option) {
    case 'y':
      bestOption = 'split';
      break;
    case 'D':
      bestOption = 'doubleDown';
      break;
    case 's':
      bestOption = 'stand';
      break;
    case 'h':
      bestOption = 'hit';
      break;
    case 'sur':
      bestOption = 'surrender';
      break;
    default:
      bestOption = '';
      break;
  }
  console.log(bestOption);
  return bestOption;
};

//BS
export const BASIC_STRATEGY_SPLITS: any = {
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

//BS Deviations

export const BASIC_STRATEGY_SPLITS_D: any = {
  '10': {
    '4': '6+ y',
    '5': '5+ y',
    '6': '4+ y'
  }
};

export const BASIC_STRATEGY_SOFT_D: any = {
  '19': {
    '4': '3+ D',
    '5': '1+ D',
    '6': '0- s'
  },
  '17': { '2': '1+ D' }
};

export const BASIC_STRATEGY_HARD_D: any = {
  '16': { '9': '4+ s', '10': '0+ s', A: '3+ s' },
  '15': { '10': '4+ s', A: '5+ s' },
  '13': { '2': '-1- h' },
  '12': {
    '2': '3+ s',
    '3': '2+ s',
    '4': '0- h'
  },
  '10': {
    '10': '4+ D',
    A: '3+ D'
  },
  '9': { '2': '1+ D', '7': '3+ D' },
  '8': { '6': '2+ D' }
};

export const BASIC_STRATEGY_SURR_D: any = {
  '16': { '8': '4+ sur', '9': '-1- h' },
  '15': { '9': '2+ sur', '10': '0- h', A: '-1+ sur' }
};
