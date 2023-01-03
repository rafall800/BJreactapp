import { WithIdRaw } from '../../util/types';

export interface Card {
  value: string;
  src: string;
}

export type WithIdCard = WithIdRaw<Card>;

export const cards: Card[] = [
  { value: 'A', src: 'AP' },
  { value: '2', src: '2P' },
  { value: '3', src: '3P' },
  { value: '4', src: '4P' },
  { value: '5', src: '5P' },
  { value: '6', src: '6P' },
  { value: '7', src: '7P' },
  { value: '8', src: '8P' },
  { value: '9', src: '9P' },
  { value: '10', src: '10P' },
  { value: '10', src: 'JP' },
  { value: '10', src: 'QP' },
  { value: '10', src: 'KP' },
  { value: 'A', src: 'AS' },
  { value: '2', src: '2S' },
  { value: '3', src: '3S' },
  { value: '4', src: '4S' },
  { value: '5', src: '5S' },
  { value: '6', src: '6S' },
  { value: '7', src: '7S' },
  { value: '8', src: '8S' },
  { value: '9', src: '9S' },
  { value: '10', src: '10S' },
  { value: '10', src: 'JS' },
  { value: '10', src: 'QS' },
  { value: '10', src: 'KS' },
  { value: 'A', src: 'AT' },
  { value: '2', src: '2T' },
  { value: '3', src: '3T' },
  { value: '4', src: '4T' },
  { value: '5', src: '5T' },
  { value: '6', src: '6T' },
  { value: '7', src: '7T' },
  { value: '8', src: '8T' },
  { value: '9', src: '9T' },
  { value: '10', src: '10T' },
  { value: '10', src: 'JT' },
  { value: '10', src: 'QT' },
  { value: '10', src: 'KT' },
  { value: 'A', src: 'AD' },
  { value: '2', src: '2D' },
  { value: '3', src: '3D' },
  { value: '4', src: '4D' },
  { value: '5', src: '5D' },
  { value: '6', src: '6D' },
  { value: '7', src: '7D' },
  { value: '8', src: '8D' },
  { value: '9', src: '9D' },
  { value: '10', src: '10D' },
  { value: '10', src: 'JD' },
  { value: '10', src: 'QD' },
  { value: '10', src: 'KD' }
];

export const shuffleCards = (decksNumber: number): WithIdCard[] => {
  return Array(decksNumber)
    .fill(cards)
    .reduce<Card[]>((acc, curr) => acc.concat(curr), [])
    .sort(() => Math.random() - 0.5)
    .map((card, index) => ({ ...card, _id: index.toString() }));
};

export const countValue = (cards: WithIdCard[]): number => {
  return cards.reduce((acc, curr) => {
    if (curr.value === 'A') {
      return acc + 11 > 21 ? acc + 1 : acc + 11;
    } else return acc + Number(curr.value);
  }, 0);
};
