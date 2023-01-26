export type WithIdRaw<T> = T & { _id: string };

export type DefaultProps = {
  children?: React.ReactNode;
};

export type Card = {
  isPrivate: boolean;
  symbol: string;
  value: 'A' | '10' | '9' | '8' | '7' | '6' | '5' | '4' | '3' | '2';
};

export type WithIdCard = WithIdRaw<Card>;

export type Options = 'hit' | 'stand' | 'split' | 'doubleDown' | 'surrender' | '';

export type Softs = '20' | '19' | '18' | '17' | '16' | '15' | '14' | '13';

export type ExercisePlayer = {
  hand: WithIdCard[];
  canSplit: boolean;
  canSurrender: boolean;
  canDoubledown: boolean;
};
