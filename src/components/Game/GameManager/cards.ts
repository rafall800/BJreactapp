import { WithIdRaw } from '../../util/types';

export interface Card {
  value: string;
  src: string;
}

export type WithIdCard = WithIdRaw<Card>;

export const cards: Card[] = [
  { value: 'A', src: '../../../assets/cards/AP.svg' },
  { value: '2', src: '../../../assets/cards/2P.svg' },
  { value: '3', src: '../../../assets/cards/3P.svg' },
  { value: '4', src: '../../../assets/cards/4P.svg' },
  { value: '5', src: '../../../assets/cards/5P.svg' },
  { value: '6', src: '../../../assets/cards/6P.svg' },
  { value: '7', src: '../../../assets/cards/7P.svg' },
  { value: '8', src: '../../../assets/cards/8P.svg' },
  { value: '9', src: '../../../assets/cards/9P.svg' },
  { value: '10', src: '../../../assets/cards/10P.svg' },
  { value: '10', src: '../../../assets/cards/JP.svg' },
  { value: '10', src: '../../../assets/cards/QP.svg' },
  { value: '10', src: '../../../assets/cards/KP.svg' },
  { value: 'A', src: '../../../assets/cards/AS.svg' },
  { value: '2', src: '../../../assets/cards/2S.svg' },
  { value: '3', src: '../../../assets/cards/3S.svg' },
  { value: '4', src: '../../../assets/cards/4S.svg' },
  { value: '5', src: '../../../assets/cards/5S.svg' },
  { value: '6', src: '../../../assets/cards/6S.svg' },
  { value: '7', src: '../../../assets/cards/7S.svg' },
  { value: '8', src: '../../../assets/cards/8S.svg' },
  { value: '9', src: '../../../assets/cards/9S.svg' },
  { value: '10', src: '../../../assets/cards/10S.svg' },
  { value: '10', src: '../../../assets/cards/JS.svg' },
  { value: '10', src: '../../../assets/cards/QS.svg' },
  { value: '10', src: '../../../assets/cards/KS.svg' },
  { value: 'A', src: '../../../assets/cards/AT.svg' },
  { value: '2', src: '../../../assets/cards/2T.svg' },
  { value: '3', src: '../../../assets/cards/3T.svg' },
  { value: '4', src: '../../../assets/cards/4T.svg' },
  { value: '5', src: '../../../assets/cards/5T.svg' },
  { value: '6', src: '../../../assets/cards/6T.svg' },
  { value: '7', src: '../../../assets/cards/7T.svg' },
  { value: '8', src: '../../../assets/cards/8T.svg' },
  { value: '9', src: '../../../assets/cards/9T.svg' },
  { value: '10', src: '../../../assets/cards/10T.svg' },
  { value: '10', src: '../../../assets/cards/JT.svg' },
  { value: '10', src: '../../../assets/cards/QT.svg' },
  { value: '10', src: '../../../assets/cards/KT.svg' },
  { value: 'A', src: '../../../assets/cards/AD.svg' },
  { value: '2', src: '../../../assets/cards/2D.svg' },
  { value: '3', src: '../../../assets/cards/3D.svg' },
  { value: '4', src: '../../../assets/cards/4D.svg' },
  { value: '5', src: '../../../assets/cards/5D.svg' },
  { value: '6', src: '../../../assets/cards/6D.svg' },
  { value: '7', src: '../../../assets/cards/7D.svg' },
  { value: '8', src: '../../../assets/cards/8D.svg' },
  { value: '9', src: '../../../assets/cards/9D.svg' },
  { value: '10', src: '../../../assets/cards/10D.svg' },
  { value: '10', src: '../../../assets/cards/JD.svg' },
  { value: '10', src: '../../../assets/cards/QD.svg' },
  { value: '10', src: '../../../assets/cards/KD.svg' }
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
