import { useState, useMemo, useCallback } from 'react';
import { countHandValue, findLastIndex, shuffleCards, WithIdCard } from './util';

export type Player = {
  seatTaken: boolean;
  isPlaying: boolean;
  hand: WithIdCard[];
  bet: number;
  outcome: 'win' | 'push' | 'lose' | undefined;
  canSplit: boolean;
  canDoubledown: boolean;
  canGetBlackJack: boolean;
  splitHands: Player[];
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
  splitHandStage: boolean;
  setSplitHandStage: React.Dispatch<React.SetStateAction<boolean>>;
  bet: number;
  setBet: React.Dispatch<React.SetStateAction<number>>;
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
  players: Player[];
  setPlayers: React.Dispatch<React.SetStateAction<Player[]>>;
  handleSeatAvailability: (player: Player) => void;
  handleSetupPlayers: () => void;
  handlePlayerBet: () => void;
  handlePlayerHit: () => void;
  handlePlayerStand: () => void;
  handlePlayerDoubledown: () => void;
  handlePlayerSplit: () => void;
  dealer: WithIdCard[];
  setDealer: React.Dispatch<React.SetStateAction<WithIdCard[]>>;
  shoe: WithIdCard[];
  setShoe: React.Dispatch<React.SetStateAction<WithIdCard[]>>;
  dealtCardsAmount: number;
  setDealtCardsAmount: React.Dispatch<React.SetStateAction<number>>;
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
  const [isNewGame, setIsNewGame] = useState<boolean>(initialValue.isNewGame);
  const [dealSpeed, setDealSpeed] = useState<number>(initialValue.dealSpeed);
  const [gameRules, setGameRules] = useState<GameRules>(initialValue.gameRules);

  const [bettingStage, setBettingStage] = useState<boolean>(initialValue.bettingStage);
  const [splitHandStage, setSplitHandStage] = useState<boolean>(initialValue.splitHandStage);

  const [shoe, setShoe] = useState<WithIdCard[]>(initialValue.shoe);
  const [dealtCardsAmount, setDealtCardsAmount] = useState<number>(initialValue.dealtCardsAmount);

  const [bet, setBet] = useState<number>(initialValue.bet);
  const [balance, setBalance] = useState<number>(initialValue.balance);

  const [players, setPlayers] = useState<Player[]>(initialValue.players);
  const [dealer, setDealer] = useState<WithIdCard[]>(initialValue.dealer);

  //counts dealer's hand value based on game settings =========REPAIR=========
  const countDealerValue = useCallback(
    (cards: WithIdCard[]): number => {
      if (
        cards.length === 2 &&
        gameRules.soft17 &&
        cards.find((card) => card.value.includes('A')) &&
        countHandValue(cards) === 17
      ) {
        return 7;
      }
      return countHandValue(cards);
    },
    [gameRules]
  );

  //Add card to provided hand and return it
  const dealCard = useCallback(
    (hand: WithIdCard[]) => {
      hand.push(shoe.pop()!);
      setShoe([...shoe]);
      setDealtCardsAmount((prevValue) => prevValue + 1);
      return hand;
    },
    [shoe]
  );

  //get new shoe of cards
  const startGame = useCallback(() => {
    if (!isNewGame) {
      return;
    }
    setShoe(shuffleCards(gameRules.decksNumber));
    setIsNewGame((prevValue) => !prevValue);
  }, [isNewGame, gameRules]);

  //determine wchich player is first in order
  const handleSetupPlayers = useCallback(() => {
    const firstPlayer = players.findIndex((player) => player.seatTaken === true);
    players.forEach((player, index) => {
      index === firstPlayer ? (player.isPlaying = true) : (player.isPlaying = false);
    });
    setPlayers([...players]);
  }, [players]);

  //reaveal dealer's hidden card and deal him card until he reaches 17, determine gameResult for each player, reset table for the nex rount
  const getGameResults = useCallback(() => {
    const getHandResult = (player: Player) => {
      //player busted
      if (player.outcome) {
        return;
      }

      const handValue = countHandValue(player.hand);

      //CAN BE SIMPLIFIED WITH SWITCH
      //dealer has 2 card BJ
      if (dealer.length === 2 && dealerValue === 21) {
        if (player.hand.length === 2 && handValue === 21) {
          player.outcome = 'push';
          newBalance += player.bet;
          return;
        } else {
          player.outcome = 'lose';
          return;
        }
      }
      //player has 2 card BJ
      if (player.hand.length === 2 && handValue === 21) {
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
      if (dealerValue === handValue) {
        player.outcome = 'push';
        newBalance += player.bet;
        return;
      }
      //player hand is greater than dealer's
      if (handValue > dealerValue) {
        player.outcome = 'win';
        newBalance += player.bet * 2;
        return;
      }
      //player hand is lower than dealer's
      player.outcome = 'lose';
      return;
    };
    if (shoe.length === 0 && countDealerValue(dealer) < 17) {
      setIsNewGame((prevValue) => !prevValue);
      return;
    }
    dealer[1]!.isPrivate = false;
    while (countDealerValue(dealer) < 17) dealCard(dealer);
    const dealerValue = countHandValue(dealer);
    let newBalance = balance;
    players.forEach((player) => {
      if (player.seatTaken) {
        getHandResult(player);
        player.splitHands.forEach((hand) => getHandResult(hand));
      }
    });
    setBalance(newBalance);
    setPlayers([...players]);
    setDealer([...dealer]);
    setTimeout(() => {
      setGameRunning(false);
      setBettingStage((prevValue) => !prevValue);
      setSplitHandStage(false);
      setDealer([]);
      setPlayers([
        ...players.map((player) => {
          player.isPlaying = false;
          player.hand = [];
          player.bet = 0;
          player.outcome = undefined;
          player.splitHands = [];
          player.canDoubledown = true;
          player.canGetBlackJack = true;
          player.canSplit = false;
          return player;
        })
      ]);
      handleSetupPlayers();
      return;
    }, 3000);
  }, [dealer, players, balance, shoe, dealCard, handleSetupPlayers, countDealerValue]);

  //add/delete a player from the table and determine wchich player is first in order
  const handleSeatAvailability = useCallback(
    (player: Player) => {
      player.seatTaken = !player.seatTaken;
      player.isPlaying = false;
      handleSetupPlayers();
    },
    [handleSetupPlayers]
  );

  //change current playing player
  const playNextHand = useCallback(
    (playingPlayerIndex: number) => {
      //if primary player just splitted -> set split hand to be next and start splitHandStage
      if (!splitHandStage && players[playingPlayerIndex]!.splitHands.length > 0) {
        setSplitHandStage(true);
        players[playingPlayerIndex]!.splitHands[0]!.isPlaying = true;
        return;
      }

      let handsToPlay = players;
      let currentPrimaryPlayerIndex = 2;

      //if one of split hands is playing ->find index of primary player and set hands we operate on to his splitHands
      if (splitHandStage) {
        const currentPlayer = players.find((player, index) => {
          if (player.isPlaying) {
            currentPrimaryPlayerIndex = index;
            return player;
          }
          return false;
        });
        if (currentPlayer) handsToPlay = currentPlayer.splitHands;
      }

      if (
        playingPlayerIndex ===
        findLastIndex(handsToPlay, (hand) => {
          if (hand.seatTaken) return true;
          return false;
        })
      ) {
        if (
          splitHandStage &&
          currentPrimaryPlayerIndex !==
            findLastIndex(players, (player) => {
              if (player.seatTaken) return true;
              return false;
            })
        ) {
          setSplitHandStage(false);
          players[currentPrimaryPlayerIndex]!.isPlaying = false;
          playNextHand(currentPrimaryPlayerIndex);
        } else {
          getGameResults();
        }
      } else if (
        handsToPlay[playingPlayerIndex + 1]!.seatTaken &&
        countHandValue(handsToPlay[playingPlayerIndex + 1]!.hand) < 21
      )
        handsToPlay[playingPlayerIndex + 1]!.isPlaying = true;
      else playNextHand(playingPlayerIndex + 1);
    },
    [players, splitHandStage, getGameResults]
  );

  //deal card to current player, change current playing player if he busts
  const handlePlayerHit = useCallback(() => {
    if (shoe.length === 0) {
      setIsNewGame((prevValue) => !prevValue);
      return;
    }

    let handsToPlay = players;
    if (splitHandStage) {
      const currentPlayer = players.find((player) => {
        if (player.isPlaying) {
          return player;
        }
        return false;
      });
      if (currentPlayer) handsToPlay = currentPlayer.splitHands;
    }

    let currentHandIndex: number = 0;

    const currentHand = handsToPlay.find((hand, index) => {
      if (hand.isPlaying) {
        currentHandIndex = index;
        return hand;
      }
      return false;
    });

    if (!currentHand) return;

    const handValue = countHandValue(dealCard(currentHand.hand));

    if (handValue === 21) {
      currentHand.isPlaying = false;
      playNextHand(currentHandIndex);
    } else if (handValue > 21) {
      currentHand.isPlaying = false;
      currentHand.outcome = 'lose';
      playNextHand(currentHandIndex);
    }
    currentHand.canDoubledown = false;
    currentHand.canSplit = false;
    setPlayers([...players]);
  }, [players, shoe, splitHandStage, dealCard, playNextHand]);

  //stand current player and change current playing player
  const handlePlayerStand = useCallback(() => {
    let handsToPlay = players;
    if (splitHandStage) {
      const currentPlayer = players.find((player) => {
        if (player.isPlaying) {
          return player;
        }
        return false;
      });
      if (currentPlayer) handsToPlay = currentPlayer.splitHands;
    }
    const currentHandIndex = handsToPlay.findIndex((hand) => hand.isPlaying); //fix when first hand is 21
    if (handsToPlay[currentHandIndex]!.splitHands.length === 0) handsToPlay[currentHandIndex]!.isPlaying = false;
    playNextHand(currentHandIndex);
    setPlayers([...players]);
  }, [players, splitHandStage, playNextHand]);

  //doubledown hand of current player
  const handlePlayerDoubledown = useCallback(() => {
    if (shoe.length === 0) {
      setIsNewGame((prevValue) => !prevValue);
      return;
    }

    let handsToPlay = players;
    if (splitHandStage) {
      const currentPlayer = players.find((player) => {
        if (player.isPlaying) {
          return player;
        }
        return false;
      });
      if (currentPlayer) handsToPlay = currentPlayer.splitHands;
    }

    let currentHandIndex: number = 0;

    const currentHand = handsToPlay.find((hand, index) => {
      if (hand.isPlaying) {
        currentHandIndex = index;
        return hand;
      }
      return false;
    });

    if (!currentHand) return;
    const bet = currentHand.bet;
    currentHand.bet = 2 * bet;
    currentHand.canDoubledown = false;
    currentHand.canSplit = false;
    currentHand.isPlaying = false;
    dealCard(currentHand.hand);
    playNextHand(currentHandIndex);
    setBalance((prevValue) => prevValue - bet);
    setPlayers([...players]);
  }, [players, shoe, splitHandStage, dealCard, playNextHand]);

  //split hand of current player
  const handlePlayerSplit = useCallback(() => {
    if (shoe.length === 0) {
      setIsNewGame((prevValue) => !prevValue);
      return;
    }
    let currentPlayerIndex: number = 2;

    const currentPlayer = players.find((player, index) => {
      if (player.isPlaying) {
        currentPlayerIndex = index;
        return player;
      }
      return false;
    });

    if (!currentPlayer) return;
    //if primary player splits
    if (!splitHandStage) {
      currentPlayer.canGetBlackJack = false;
      currentPlayer.canDoubledown = true;
      const newHand: Player = {
        ...currentPlayer,
        hand: currentPlayer.hand.splice(1),
        isPlaying: false,
        splitHands: []
      };
      dealCard(currentPlayer.hand);
      dealCard(newHand.hand);
      currentPlayer.splitHands.push(newHand);
      if (countHandValue(currentPlayer.hand) >= 21) playNextHand(currentPlayerIndex);
      //if splitHands splits
    } else {
      let currentPlayerSplitHandIndex = 0;
      const currentPlayerSplitHand = currentPlayer.splitHands.find((hand, index) => {
        if (hand.isPlaying) {
          currentPlayerSplitHandIndex = index;
          return hand;
        }
        return false;
      });
      if (!currentPlayerSplitHand) return;
      currentPlayerSplitHand.canGetBlackJack = false;
      currentPlayerSplitHand.canDoubledown = true;
      const newHand: Player = {
        ...currentPlayerSplitHand,
        hand: currentPlayerSplitHand.hand.splice(1),
        isPlaying: false,
        splitHands: []
      };
      dealCard(currentPlayerSplitHand.hand);
      dealCard(newHand.hand);
      currentPlayer.splitHands.push(newHand);
      if (countHandValue(currentPlayerSplitHand.hand) >= 21) playNextHand(currentPlayerSplitHandIndex);
    }
    setBalance((prevValue) => prevValue - currentPlayer.bet);
    setPlayers([...players]);
  }, [players, shoe, splitHandStage, dealCard, playNextHand]);

  //deal the first two cards to every player and dealer
  const startDeal = useCallback(() => {
    for (let i = 0; i < 2; i++) {
      players.forEach((player) => {
        if (player.seatTaken) {
          if (shoe.length === 0) {
            setIsNewGame((prevValue) => !prevValue);
            return;
          }
          dealCard(player.hand);
          if (i === 1) {
            if (player.hand) {
            }
          }
        }
      });
      if (shoe.length === 0) {
        setIsNewGame((prevValue) => !prevValue);
        return;
      }
      dealCard(dealer);
    }
    dealer[1]!.isPrivate = true;
    setPlayers([...players]);
    setDealer([...dealer]);
    const firstPlayer = players.findIndex((player) => player.seatTaken === true);
    if (countHandValue(players[firstPlayer]!.hand) === 21) handlePlayerStand();
  }, [dealer, players, shoe, dealCard, handlePlayerStand]);

  //change current betting player
  const betNextHand = useCallback(
    (currentPlayerIndex: number) => {
      if (currentPlayerIndex === players.length - 1) {
        setBettingStage((prevValue) => !prevValue);
        startDeal();
        handleSetupPlayers();
      } else if (players[currentPlayerIndex + 1]!.seatTaken) players[currentPlayerIndex + 1]!.isPlaying = true;
      else betNextHand(currentPlayerIndex + 1);
    },
    [players, startDeal, handleSetupPlayers]
  );

  //make a bet for current player and change current betting player
  const handlePlayerBet = useCallback(() => {
    const currentPlayerIndex = players.findIndex((player) => player.isPlaying);
    setBalance((prevValue) => prevValue - bet);
    players[currentPlayerIndex]!.bet = bet;
    players[currentPlayerIndex]!.isPlaying = false;
    betNextHand(currentPlayerIndex);
    setPlayers([...players]);
  }, [bet, players, betNextHand]);

  return useMemo(
    () => ({
      gameRules,
      setGameRules,
      gameRunning,
      setGameRunning,
      bettingStage,
      setBettingStage,
      splitHandStage,
      setSplitHandStage,
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
      handlePlayerDoubledown,
      handlePlayerSplit,
      dealer,
      setDealer,
      shoe,
      setShoe,
      dealtCardsAmount,
      setDealtCardsAmount,
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
      splitHandStage,
      setSplitHandStage,
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
      handlePlayerDoubledown,
      handlePlayerSplit,
      dealer,
      setDealer,
      shoe,
      setShoe,
      dealtCardsAmount,
      setDealtCardsAmount,
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
