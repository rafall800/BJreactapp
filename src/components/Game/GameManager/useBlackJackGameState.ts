import { useState, useMemo, useCallback } from 'react';
import { shuffleCards, WithIdCard } from './cards';

export type Player = { isPlaying: boolean; hand: WithIdCard[] };

export interface BlackJackGameInterface {
  bet: number;
  setBet: React.Dispatch<React.SetStateAction<number>>;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  addPlayer: (playerNumber: number) => void;
  dealer: WithIdCard[];
  setDealer: React.Dispatch<React.SetStateAction<WithIdCard[]>>;
  deck: WithIdCard[];
  setDeck: React.Dispatch<React.SetStateAction<WithIdCard[]>>;
  isNewGame: boolean;
  setIsNewGame: React.Dispatch<React.SetStateAction<boolean>>;
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
        if (player.isPlaying) dealCard(player.hand);
        setPlayers([...players]);
      });
    }
  }, [dealer, players, setDealer, setPlayers, dealCard]);

  const addPlayer = useCallback(
    (playerNumber: number) => {
      const newState = players.map((player, index) => {
        if (index === playerNumber) return { ...player, isPlaying: true };
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
      addPlayer,
      dealer,
      setDealer,
      deck,
      setDeck,
      isNewGame,
      setIsNewGame,
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
      addPlayer,
      dealer,
      setDealer,
      deck,
      setDeck,
      isNewGame,
      setIsNewGame,
      startGame,
      startDeal,
      dealCard
    ]
  );
};
