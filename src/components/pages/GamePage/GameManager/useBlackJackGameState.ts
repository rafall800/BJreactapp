import { useState, useMemo, useCallback } from 'react';
import { shuffleCards, WithIdCard } from './cards';

export type Player = { seatTaken: boolean; isPlaying: boolean; hand: WithIdCard[] };

export interface BlackJackGameInterface {
  bet: number;
  setBet: React.Dispatch<React.SetStateAction<number>>;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  handleSeatAvailability: (playerNumber: number) => void;
  dealer: WithIdCard[];
  setDealer: React.Dispatch<React.SetStateAction<WithIdCard[]>>;
  deck: WithIdCard[];
  setDeck: React.Dispatch<React.SetStateAction<WithIdCard[]>>;
  isNewGame: boolean;
  setIsNewGame: React.Dispatch<React.SetStateAction<boolean>>;
  dealSpeed: number;
  setDealSpeed: React.Dispatch<React.SetStateAction<number>>;
  dealCard: (hand: WithIdCard[]) => WithIdCard[];
  startGame: () => void;
  startDeal: () => void;
}

export const useBlackJackGameState = (initialValue: BlackJackGameInterface): BlackJackGameInterface => {
  const [bet, setBet] = useState<number>(initialValue.bet);
  const [balance, setBalance] = useState<number>(initialValue.balance);

  const [players, setPlayers] = useState<Player[]>(initialValue.players);
  const [dealer, setDealer] = useState<WithIdCard[]>(initialValue.dealer);

  const [isNewGame, setIsNewGame] = useState<boolean>(initialValue.isNewGame);
  const [deck, setDeck] = useState<WithIdCard[]>(initialValue.deck);

  const [dealSpeed, setDealSpeed] = useState<number>(initialValue.dealSpeed);

  const dealCard = useCallback(
    (hand: WithIdCard[]) => {
      if (!deck) setDeck(shuffleCards(6));
      hand.push(deck.pop()!);
      setDeck([...deck]);
      return hand;
    },
    [deck, setDeck]
  );

  const startGame = useCallback(() => {
    if (!isNewGame) {
      return;
    }
    setDeck(shuffleCards(6));
    setIsNewGame(!isNewGame);
  }, [isNewGame, setDeck, setIsNewGame]);

  const startDeal = useCallback(() => {
    for (let i = 0; i < 2; i++) {
      setDealer([...dealCard(dealer)]);
      players.forEach((player) => {
        if (player.seatTaken) dealCard(player.hand);
        setPlayers([...players]);
      });
    }
    dealer[1]!.isPrivate = true;
    setDealer([...dealer]);
  }, [dealer, players, setDealer, setPlayers, dealCard]);

  const handleSeatAvailability = useCallback(
    (playerNumber: number) => {
      const newState = players.map((player, index) => {
        if (index === playerNumber) return { ...player, seatTaken: !player.seatTaken, isPlaying: false, hand: [] };
        return player;
      });
      setPlayers(newState);
    },
    [players, setPlayers]
  );

  return useMemo(
    () => ({
      bet,
      setBet,
      balance,
      setBalance,
      players,
      setPlayers,
      handleSeatAvailability,
      dealer,
      setDealer,
      deck,
      setDeck,
      isNewGame,
      setIsNewGame,
      dealSpeed,
      setDealSpeed,
      startGame,
      startDeal,
      dealCard
    }),
    [
      bet,
      setBet,
      balance,
      setBalance,
      players,
      setPlayers,
      handleSeatAvailability,
      dealer,
      setDealer,
      deck,
      setDeck,
      isNewGame,
      setIsNewGame,
      dealSpeed,
      setDealSpeed,
      startGame,
      startDeal,
      dealCard
    ]
  );
};
