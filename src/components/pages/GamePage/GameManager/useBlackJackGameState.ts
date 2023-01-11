import { useState, useMemo, useCallback } from 'react';
import { countPlayerValue, shuffleCards, WithIdCard } from './util';

export type Player = {
  seatTaken: boolean;
  isPlaying: boolean;
  hand: WithIdCard[];
  bet: number;
  outcome: 'win' | 'push' | 'lose' | undefined;
};

export type GameRules = {
  soft17: boolean;
  decksNumber: number;
};
export interface BlackJackGameInterface {
  gameRules: GameRules;
  setGameRules: React.Dispatch<React.SetStateAction<GameRules>>;
  gameRunning: boolean;
  setGameRunning: React.Dispatch<React.SetStateAction<boolean>>;
  bettingStage: boolean;
  setBettingStage: React.Dispatch<React.SetStateAction<boolean>>;
  bet: number;
  setBet: React.Dispatch<React.SetStateAction<number>>;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  handleSeatAvailability: (player: Player) => void;
  handleSetupPlayers: () => void;
  handlePlayerBet: () => void;
  handlePLayerHit: () => void;
  handlePLayerStand: () => void;
  dealer: WithIdCard[];
  setDealer: React.Dispatch<React.SetStateAction<WithIdCard[]>>;
  shoe: WithIdCard[];
  setShoe: React.Dispatch<React.SetStateAction<WithIdCard[]>>;
  isNewGame: boolean;
  setIsNewGame: React.Dispatch<React.SetStateAction<boolean>>;
  dealSpeed: number;
  setDealSpeed: React.Dispatch<React.SetStateAction<number>>;
  dealCard: (hand: WithIdCard[]) => WithIdCard[];
  startGame: () => void;
  startDeal: () => void;
  countDealerValue: (cards: WithIdCard[]) => number;
}

export const useBlackJackGameState = (initialValue: BlackJackGameInterface): BlackJackGameInterface => {
  const [gameRunning, setGameRunning] = useState<boolean>(initialValue.gameRunning);
  const [bettingStage, setBettingStage] = useState<boolean>(initialValue.bettingStage);

  const [bet, setBet] = useState<number>(initialValue.bet);
  const [balance, setBalance] = useState<number>(initialValue.balance);

  const [players, setPlayers] = useState<Player[]>(initialValue.players);

  const [dealer, setDealer] = useState<WithIdCard[]>(initialValue.dealer);

  const [isNewGame, setIsNewGame] = useState<boolean>(initialValue.isNewGame);
  const [shoe, setShoe] = useState<WithIdCard[]>(initialValue.shoe);

  const [dealSpeed, setDealSpeed] = useState<number>(initialValue.dealSpeed);
  const [gameRules, setGameRules] = useState<GameRules>(initialValue.gameRules);

  //counts dealer's hand value based on game settings
  const countDealerValue = useCallback(
    (cards: WithIdCard[]): number => {
      if (
        cards.length === 2 &&
        gameRules.soft17 &&
        cards.find((card) => card.value.includes('A')) &&
        countPlayerValue(cards) === 17
      ) {
        return 7;
      }
      return countPlayerValue(cards);
    },
    [gameRules]
  );

  //Add card to provided hand and return it
  const dealCard = useCallback(
    (hand: WithIdCard[]) => {
      if (!shoe) setShoe(shuffleCards(gameRules.decksNumber));
      hand.push(shoe.pop()!);
      setShoe([...shoe]);
      return hand;
    },
    [shoe, gameRules, setShoe]
  );

  //get new shoe of cards
  const startGame = useCallback(() => {
    if (!isNewGame) {
      return;
    }
    setShoe(shuffleCards(gameRules.decksNumber));
    setIsNewGame(!isNewGame);
  }, [isNewGame, gameRules, setShoe, setIsNewGame]);

  //determine wchich player is first in order
  const handleSetupPlayers = useCallback(() => {
    const firstPlayer = players.findIndex((player) => player.seatTaken === true);
    const newState = players.map((player, index) => {
      index === firstPlayer ? (player.isPlaying = true) : (player.isPlaying = false);
      return player;
    });
    setPlayers([...newState]);
  }, [players, setPlayers]);

  //reaveal dealer's hidden card and deal him card until he reaches 17, determine gameResult for each player, reset table for the nex rount
  const getGameResults = useCallback(() => {
    dealer[1]!.isPrivate = false;
    while (countDealerValue(dealer) < 17) dealCard(dealer);
    const dealerValue = countPlayerValue(dealer);
    let newBalance = balance;
    players.forEach((player) => {
      if (player.seatTaken) {
        //player busted
        if (player.outcome) {
          return;
        }

        const playerValue = countPlayerValue(player.hand);

        //CAN BE SIMPLIFIED WITH SWITCH
        //dealer has 2 card BJ
        if (dealer.length === 2 && dealerValue === 21) {
          if (player.hand.length === 2 && playerValue === 21) {
            player.outcome = 'push';
            newBalance += player.bet;
            return;
          } else {
            player.outcome = 'lose';
            return;
          }
        }
        //player has 2 card BJ
        if (player.hand.length === 2 && playerValue === 21) {
          player.outcome = 'win';
          newBalance += player.bet * 2.5;
          return;
        }
        //dealer busts
        if (dealerValue > 21) {
          player.outcome = 'win';
          newBalance += player.bet * 2;
          return;
        }
        //hands are equal
        if (dealerValue === playerValue) {
          player.outcome = 'push';
          newBalance += player.bet;
          return;
        }
        //player hand is greater than dealer's
        if (playerValue > dealerValue) {
          player.outcome = 'win';
          newBalance += player.bet * 2;
          return;
        }
        //player hand is lower than dealer's
        player.outcome = 'lose';
        return;
      }
    });
    setBalance(newBalance);
    setPlayers([...players]);
    setDealer([...dealer]);
    setTimeout(() => {
      setGameRunning(false);
      setBettingStage(true);
      setDealer([]);
      setPlayers([
        ...players.map((player) => {
          player.isPlaying = false;
          player.hand = [];
          player.bet = 0;
          player.outcome = undefined;
          return player;
        })
      ]);
      handleSetupPlayers();
      return;
    }, 3000);
  }, [dealer, players, balance, dealCard, handleSetupPlayers, countDealerValue]);

  //deal the first two cards to every player and dealer
  const startDeal = useCallback(() => {
    let playersNumber = 0;
    for (let i = 0; i < 2; i++) {
      // eslint-disable-next-line no-loop-func
      players.forEach((player) => {
        if (player.seatTaken) {
          dealCard(player.hand);
          playersNumber++;
        }
      });
      dealCard(dealer);
    }
    dealer[1]!.isPrivate = true;
    setPlayers([...players]);
    setDealer([...dealer]);
    if (playersNumber === 1 && countPlayerValue(players[2]!.hand) === 21) getGameResults();
  }, [dealer, players, setDealer, setPlayers, dealCard, getGameResults]);

  //add/delete a player from the table and determine wchich player is first in order
  const handleSeatAvailability = useCallback(
    (player: Player) => {
      player.seatTaken = !player.seatTaken;
      player.isPlaying = false;
      handleSetupPlayers();
    },
    [handleSetupPlayers]
  );

  //change current betting player
  const betNextHand = useCallback(
    (currentPlayerIndex: number) => {
      if (currentPlayerIndex === players.length - 1) {
        setBettingStage(false);
        startDeal();
        handleSetupPlayers();
      } else if (players[currentPlayerIndex + 1]!.seatTaken) players[currentPlayerIndex + 1]!.isPlaying = true;
      else betNextHand(currentPlayerIndex + 1);
    },
    [players, setBettingStage, startDeal, handleSetupPlayers]
  );

  //make a bet for current player and change current betting player
  const handlePlayerBet = useCallback(() => {
    const currentPlayerIndex = players.findIndex((player) => player.isPlaying);
    setBalance(balance - bet);
    players[currentPlayerIndex]!.bet = bet;
    players[currentPlayerIndex]!.isPlaying = false;
    betNextHand(currentPlayerIndex);
    setPlayers([...players]);
  }, [bet, balance, players, setPlayers, setBalance, betNextHand]);

  //change current playing player
  const playNextHand = useCallback(
    (currentPlayer: number) => {
      if (currentPlayer === players.length - 1) getGameResults();
      else if (players[currentPlayer + 1]!.seatTaken && countPlayerValue(players[currentPlayer + 1]!.hand) < 21)
        players[currentPlayer + 1]!.isPlaying = true;
      else playNextHand(currentPlayer + 1);
    },
    [players, getGameResults]
  );

  //deal card to current player, change current playing player if he busts
  const handlePlayerHit = useCallback(() => {
    const currentPlayer = players.findIndex((player) => player.isPlaying);
    const handValue = countPlayerValue(dealCard(players[currentPlayer]!.hand));
    if (handValue === 21) {
      players[currentPlayer]!.isPlaying = false;
      playNextHand(currentPlayer);
    } else if (handValue > 21) {
      players[currentPlayer]!.isPlaying = false;
      players[currentPlayer]!.outcome = 'lose';
      playNextHand(currentPlayer);
    }
    setPlayers([...players]);
  }, [players, setPlayers, dealCard, playNextHand]);

  //stand current player and change current playing player
  const handlePlayerStand = useCallback(() => {
    const currentPlayer = players.findIndex((player) => player.isPlaying);
    players[currentPlayer]!.isPlaying = false;
    playNextHand(currentPlayer);
    setPlayers([...players]);
  }, [players, setPlayers, playNextHand]);

  return useMemo(
    () => ({
      gameRules,
      setGameRules,
      gameRunning,
      setGameRunning,
      bettingStage,
      setBettingStage,
      bet,
      setBet,
      balance,
      setBalance,
      players,
      setPlayers,
      handleSeatAvailability,
      handleSetupPlayers,
      handlePlayerBet,
      handlePLayerHit: handlePlayerHit,
      handlePLayerStand: handlePlayerStand,
      dealer,
      setDealer,
      shoe,
      setShoe,
      isNewGame,
      setIsNewGame,
      dealSpeed,
      setDealSpeed,
      startGame,
      startDeal,
      dealCard,
      countDealerValue
    }),
    [
      gameRules,
      setGameRules,
      gameRunning,
      setGameRunning,
      bettingStage,
      setBettingStage,
      bet,
      setBet,
      balance,
      setBalance,
      players,
      setPlayers,
      handleSeatAvailability,
      handleSetupPlayers,
      handlePlayerBet,
      handlePlayerHit,
      handlePlayerStand,
      dealer,
      setDealer,
      shoe,
      setShoe,
      isNewGame,
      setIsNewGame,
      dealSpeed,
      setDealSpeed,
      startGame,
      startDeal,
      dealCard,
      countDealerValue
    ]
  );
};
