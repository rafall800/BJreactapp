import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useCallback } from 'react';
import {
  countHandValue,
  findLastIndex,
  shuffleCards,
  BASIC_STRATEGY_SPLITS,
  BASIC_STRATEGY_SOFT,
  BASIC_STRATEGY_HARD,
  getCardCount,
  BASIC_STRATEGY_SPLITS_D,
  checkDeviation,
  BASIC_STRATEGY_SOFT_D,
  BASIC_STRATEGY_SURR_D,
  BASIC_STRATEGY_HARD_D
} from '../utils/functions';
import { WithIdCard, Options } from '../utils/types';

export type Player = {
  seatTaken: boolean;
  isPlaying: boolean;
  hand: WithIdCard[];
  bet: number;
  outcome: 'win' | 'push' | 'lose' | 'surrender' | undefined;
  betOutcome: number;
  canSplit: boolean;
  canDoubledown: boolean;
  canGetBlackJack: boolean;
  canSurrender: boolean;
  splitHands: Player[];
  playerName: string;
};

export type GameRules = {
  soft17: boolean;
  decksNumber: number;
  penetration: number;
};

export type GameHand = {
  betOutcome: number;
  outcome: 'win' | 'push' | 'lose' | 'surrender' | undefined;
  handData: HandGameData[];
  handName: string;
};

export type HandGameData = {
  playerHand: WithIdCard[];
  dealerHand: WithIdCard;
  trueCount: number;
  playerOption: string;
  bestOption: string;
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
  handlePlayerSurrender: () => void;
  dealer: WithIdCard[];
  setDealer: React.Dispatch<React.SetStateAction<WithIdCard[]>>;
  shoe: WithIdCard[];
  setShoe: React.Dispatch<React.SetStateAction<WithIdCard[]>>;
  dealtCardsAmount: number;
  setDealtCardsAmount: React.Dispatch<React.SetStateAction<number>>;
  penetrationReached: boolean;
  setPenetrationReached: React.Dispatch<React.SetStateAction<boolean>>;
  isNewGame: boolean;
  setIsNewGame: React.Dispatch<React.SetStateAction<boolean>>;
  dealSpeed: number;
  gameData: GameHand[][];
  setGameData: React.Dispatch<React.SetStateAction<GameHand[][]>>;
  runningCount: number;
  setRunningCount: React.Dispatch<React.SetStateAction<number>>;
  setDealSpeed: React.Dispatch<React.SetStateAction<number>>;
  dealCard: (hand: WithIdCard[]) => WithIdCard[];
  startGame: () => void;
  startDeal: () => void;
  countDealerValue: (cards: WithIdCard[]) => number;
}

export const useBlackJackGameState = (initialValue: BlackJackGameInterface): BlackJackGameInterface => {
  const navigate = useNavigate();
  const [gameRunning, setGameRunning] = useState<boolean>(initialValue.gameRunning);
  const [isNewGame, setIsNewGame] = useState<boolean>(initialValue.isNewGame);
  const [dealSpeed, setDealSpeed] = useState<number>(initialValue.dealSpeed);
  const [gameRules, setGameRules] = useState<GameRules>({ ...initialValue.gameRules });

  const [bettingStage, setBettingStage] = useState<boolean>(initialValue.bettingStage);
  const [splitHandStage, setSplitHandStage] = useState<boolean>(initialValue.splitHandStage);

  const [shoe, setShoe] = useState<WithIdCard[]>([...initialValue.shoe]);
  const [dealtCardsAmount, setDealtCardsAmount] = useState<number>(initialValue.dealtCardsAmount);
  const [penetrationReached, setPenetrationReached] = useState<boolean>(false);

  const [bet, setBet] = useState<number>(initialValue.bet);
  const [balance, setBalance] = useState<number>(initialValue.balance);

  const [players, setPlayers] = useState<Player[]>([...initialValue.players]);
  const [dealer, setDealer] = useState<WithIdCard[]>([...initialValue.dealer]);

  const [gameData, setGameData] = useState<GameHand[][]>([...initialValue.gameData]);
  const [runningCount, setRunningCount] = useState<number>(initialValue.runningCount);

  //adds data of most recent move to gameData
  const handleAddGameData = useCallback(
    (player: Player, dealerHand: WithIdCard[], count: number, cardsLeft: number, option: Options) => {
      const decsLeft = Math.round(cardsLeft / 52);
      const trueCount = Math.round((count / decsLeft) * 100) / 100;
      const dealer = dealerHand[0]!;
      let bestOption: Options | '' = '';
      //split
      if (player.hand.length === 2 && player.hand[0]!.value === player.hand[1]!.value) {
        if (BASIC_STRATEGY_SPLITS[player.hand[0]!.value][dealer.value] === 'y') bestOption = 'split';
        //deviation
        const deviation = checkDeviation(
          BASIC_STRATEGY_SPLITS_D,
          dealer.value,
          countHandValue(player.hand).toString(),
          trueCount
        );
        if (deviation !== '') bestOption = deviation;
      }
      //soft
      if (!bestOption && player.hand.find((card) => card.value === 'A')) {
        let AcesNumber = 0;
        let isAlternative = false;

        let playerValue = player.hand.reduce((acc, curr) => {
          if (curr.value === 'A') {
            AcesNumber++;
            return acc;
          }
          return acc + Number(curr.value);
        }, 0);
        for (let i = 0; i < AcesNumber; i++) {
          if (playerValue + 11 > 21) playerValue = playerValue + 1;
          else {
            playerValue = playerValue + 11;
            isAlternative = true;
          }
        }
        if (isAlternative && playerValue.toString() in BASIC_STRATEGY_SOFT) {
          switch (BASIC_STRATEGY_SOFT[playerValue.toString()][dealer.value]) {
            case 's':
              bestOption = 'stand';
              break;
            case 'h':
              bestOption = 'hit';
              break;
            case 'D':
              if (player.canDoubledown) bestOption = 'doubleDown';
              else bestOption = 'hit';
              break;
            case 'Ds':
              if (player.canDoubledown) bestOption = 'doubleDown';
              else bestOption = 'stand';
              break;
            default:
              break;
          }
        }
        //deviation
        const deviation = checkDeviation(
          BASIC_STRATEGY_SOFT_D,
          dealer.value,
          countHandValue(player.hand).toString(),
          trueCount
        );
        if (deviation !== '') bestOption = deviation;
      }
      //surrender
      if (!bestOption && player.canSurrender) {
        if (countHandValue(player.hand) === 17 && dealer.value === 'A') bestOption = 'surrender';
        if (countHandValue(player.hand) === 16 && ['9', '10', 'A'].includes(dealer.value)) bestOption = 'surrender';
        if (countHandValue(player.hand) === 15 && dealer.value === '10') bestOption = 'surrender';
        //deviation
        const deviation = checkDeviation(
          BASIC_STRATEGY_SURR_D,
          dealer.value,
          countHandValue(player.hand).toString(),
          trueCount
        );
        if (deviation !== '') bestOption = deviation;
      }
      //hard
      if (!bestOption) {
        switch (BASIC_STRATEGY_HARD[countHandValue(player.hand).toString()][dealer.value]) {
          case 's':
            bestOption = 'stand';
            break;
          case 'h':
            bestOption = 'hit';
            break;
          case 'D':
            if (player.canDoubledown) bestOption = 'doubleDown';
            else bestOption = 'hit';
            break;
          case 'Ds':
            if (player.canDoubledown) bestOption = 'doubleDown';
            else bestOption = 'stand';
            break;
          default:
            break;
        }
        //deviation
        const deviation = checkDeviation(
          BASIC_STRATEGY_HARD_D,
          dealer.value,
          countHandValue(player.hand).toString(),
          trueCount
        );
        if (deviation !== '') bestOption = deviation;
      }
      const newHandData = {
        playerHand: player.hand,
        dealerHand: dealer,
        trueCount: trueCount,
        playerOption: option,
        bestOption: bestOption
      };
      let currentHand: GameHand | undefined = gameData[gameData.length - 1]?.find(
        (hand) => hand.handName === player.playerName
      );
      if (!currentHand) {
        currentHand = {
          betOutcome: 0,
          outcome: undefined,
          handData: [newHandData],
          handName: player.playerName
        };
        gameData[gameData.length - 1]!.push(currentHand);
      } else currentHand.handData.push(newHandData);
      setGameData([...gameData]);
      return;
    },
    [gameData]
  );
  //counts dealer's hand value based on game settings
  const countDealerValue = useCallback(
    (cards: WithIdCard[]): number => {
      if (cards.length === 2 && ['10', 'A'].includes(cards[0]!.value)) {
        let handCount = 0;
        cards.forEach((card) => {
          if (card.value === 'A') handCount += 11;
          else handCount += Number(card.value);
        });
        if (handCount === 21) return 21;
      }
      if (
        cards.length === 2 &&
        gameRules.soft17 &&
        cards.find((card) => card.value.includes('A')) &&
        cards.find((card) => card.value.includes('6'))
      ) {
        return 7;
      }
      return countHandValue(cards);
    },
    [gameRules]
  );

  const getHandsAmount = useCallback((): number => {
    return players.reduce((acc, curr) => {
      if (curr.seatTaken) return acc + 1 + curr.splitHands.length;
      return acc;
    }, 0);
  }, [players]);

  //Add card to provided hand and return it
  const dealCard = useCallback(
    (hand: WithIdCard[]) => {
      const maxCardsAmount = gameRules.decksNumber * 52;
      if (shoe.length === maxCardsAmount - maxCardsAmount * gameRules.penetration) setPenetrationReached(true);
      hand.push(shoe.pop()!);
      setShoe([...shoe]);
      setDealtCardsAmount((prevValue) => prevValue + 1);
      return hand;
    },
    [shoe, gameRules]
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
      if (player.outcome === 'lose') {
        return;
      }
      if (player.outcome === 'surrender') {
        player.betOutcome = player.bet * 0.5;
        return;
      }

      const handValue = countHandValue(player.hand);

      //CAN BE SIMPLIFIED WITH SWITCH
      //dealer has 2 card BJ
      if (dealer.length === 2 && dealerValue === 21) {
        if (player.hand.length === 2 && handValue === 21) {
          player.outcome = 'push';
          player.betOutcome = player.bet;
          return;
        } else {
          player.outcome = 'lose';
          return;
        }
      }
      //player has 2 card BJ
      if (player.hand.length === 2 && handValue === 21) {
        player.outcome = 'win';
        player.betOutcome = player.bet * 2.5;
        return;
      }
      //dealer busts
      if (dealerValue > 21) {
        player.outcome = 'win';
        player.betOutcome = player.bet * 2;
        return;
      }
      //hands are equal
      if (dealerValue === handValue) {
        player.outcome = 'push';
        player.betOutcome = player.bet;
        return;
      }
      //player hand is greater than dealer's
      if (handValue > dealerValue) {
        player.outcome = 'win';
        player.betOutcome = player.bet * 2;
        return;
      }
      //player hand is lower than dealer's
      player.outcome = 'lose';
      return;
    };
    dealer[1]!.isPrivate = false;
    const currentGameData = gameData[gameData.length - 1]!;
    if (countDealerValue(dealer) === 21) {
      const decsLeft = Math.round(shoe.length / 52);
      const trueCount = Math.round((runningCount / decsLeft) * 100) / 100;
      players.forEach((player) => {
        if (player.seatTaken) {
          currentGameData.push({
            betOutcome: 0,
            outcome: undefined,
            handData: [
              {
                playerHand: player.hand,
                dealerHand: dealer[0]!,
                trueCount: trueCount,
                playerOption: '',
                bestOption: ''
              }
            ],
            handName: player.playerName
          });
        }
      });
    }
    let count = getCardCount(dealer[1]!);
    while (countDealerValue(dealer) < 17) count += getCardCount(dealCard(dealer).at(-1)!);
    setRunningCount((prevValue) => prevValue + count);
    const dealerValue = countHandValue(dealer);
    let newBalance = balance;
    players.forEach((player) => {
      if (player.seatTaken) {
        getHandResult(player);
        newBalance += player.betOutcome;
        const gameDataPlayer = currentGameData.find((gameDataPlayer) => gameDataPlayer.handName === player.playerName);
        if (!gameDataPlayer) return;
        gameDataPlayer.outcome = player.outcome;
        gameDataPlayer.betOutcome = player.betOutcome - player.bet;
        player.splitHands.forEach((hand) => {
          getHandResult(hand);
          newBalance += hand.betOutcome;
          const gameDataSplitPlayer = currentGameData.find(
            (gameDataPlayer) => gameDataPlayer.handName === hand.playerName
          );
          if (!gameDataSplitPlayer) return;
          gameDataSplitPlayer.outcome = hand.outcome;
          gameDataSplitPlayer.betOutcome = hand.betOutcome;
        });
      }
    });
    if (newBalance < 5) navigate(0);
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
          player.betOutcome = 0;
          player.splitHands = [];
          player.canDoubledown = true;
          player.canGetBlackJack = true;
          player.canSplit = false;
          player.canSurrender = true;
          return player;
        })
      ]);
      handleSetupPlayers();
      return;
    }, 2000 + 500 * getHandsAmount());
    const maxCardsAmount = gameRules.decksNumber * 52;
    if (shoe.length <= maxCardsAmount - maxCardsAmount * gameRules.penetration) {
      setShoe(shuffleCards(gameRules.decksNumber));
      setPenetrationReached(false);
      setDealtCardsAmount(0);
      setRunningCount(0);
    }
    setGameData([...gameData]);
  }, [
    dealer,
    players,
    balance,
    shoe,
    gameRules,
    gameData,
    runningCount,
    navigate,
    dealCard,
    handleSetupPlayers,
    countDealerValue,
    getHandsAmount
  ]);
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
      let handsToPlay = players;
      let currentPrimaryPlayerIndex = 2;

      //if primary player just splitted -> set split hand to be next and start splitHandStage
      if (!splitHandStage && players[playingPlayerIndex]!.splitHands.length > 0) {
        setSplitHandStage(true);
        players[playingPlayerIndex]!.splitHands[0]!.isPlaying = true;
        return;
      }

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
      } else if (handsToPlay[playingPlayerIndex + 1]!.seatTaken) handsToPlay[playingPlayerIndex + 1]!.isPlaying = true;
      else {
        playNextHand(playingPlayerIndex + 1);
      }
    },
    [players, splitHandStage, getGameResults]
  );

  //deal card to current player, change current playing player if he busts
  const handlePlayerHit = useCallback(() => {
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
    handleAddGameData(JSON.parse(JSON.stringify(currentHand)), [...dealer], runningCount, shoe.length, 'hit');
    const newHand = dealCard(currentHand.hand);
    setRunningCount((prevValue) => prevValue + getCardCount(newHand.at(-1)!));
    const handValue = countHandValue(newHand);

    if (handValue === 21) {
      if (currentHand.splitHands.length === 0) currentHand.isPlaying = false;
      playNextHand(currentHandIndex);
    } else if (handValue > 21) {
      if (currentHand.splitHands.length === 0) currentHand.isPlaying = false;
      currentHand.outcome = 'lose';
      playNextHand(currentHandIndex);
    }
    currentHand.canDoubledown = false;
    currentHand.canSplit = false;
    currentHand.canSurrender = false;
    setPlayers([...players]);
  }, [players, dealer, shoe, splitHandStage, runningCount, dealCard, playNextHand, handleAddGameData]);

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
    const currentHandIndex = handsToPlay.findIndex((hand) => hand.isPlaying);
    if (countHandValue(handsToPlay[currentHandIndex]!.hand) <= 21)
      handleAddGameData(
        JSON.parse(JSON.stringify(handsToPlay[currentHandIndex]!)),
        [...dealer],
        runningCount,
        shoe.length,
        'stand'
      );
    if (handsToPlay[currentHandIndex]!.splitHands.length === 0) handsToPlay[currentHandIndex]!.isPlaying = false;
    playNextHand(currentHandIndex);
    setPlayers([...players]);
  }, [players, splitHandStage, dealer, shoe, runningCount, handleAddGameData, playNextHand]);

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
    handleAddGameData(JSON.parse(JSON.stringify(currentHand)), [...dealer], runningCount, shoe.length, 'doubleDown');

    const bet = currentHand.bet;
    currentHand.bet = 2 * bet;
    currentHand.canDoubledown = false;
    currentHand.canSplit = false;
    currentHand.canSurrender = false;
    currentHand.isPlaying = false;
    const newHand = dealCard(currentHand.hand);
    setRunningCount((prevValue) => prevValue + getCardCount(newHand.at(-1)!));
    const handValue = countHandValue(newHand);
    if (handValue > 21) currentHand.outcome = 'lose';
    playNextHand(currentHandIndex);
    setBalance((prevValue) => prevValue - bet);
    setPlayers([...players]);
  }, [players, dealer, shoe, splitHandStage, runningCount, dealCard, playNextHand, handleAddGameData]);

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
      handleAddGameData(JSON.parse(JSON.stringify(currentPlayer)), [...dealer], runningCount, shoe.length, 'split');
      currentPlayer.canGetBlackJack = false;
      currentPlayer.canSurrender = false;
      currentPlayer.canDoubledown = true;
      currentPlayer.canSplit = false;
      const newHand: Player = {
        ...currentPlayer,
        hand: currentPlayer.hand.splice(1),
        isPlaying: false,
        splitHands: [],
        playerName: currentPlayer.playerName + `-splitHand${currentPlayer.splitHands.length + 1}`
      };
      dealCard(currentPlayer.hand);
      dealCard(newHand.hand);
      setRunningCount(
        (prevValue) => prevValue + getCardCount(currentPlayer.hand.at(-1)!) + getCardCount(newHand.hand.at(-1)!)
      );
      if (
        currentPlayer.hand.length === 2 &&
        currentPlayer.hand.every((card) => card.value === currentPlayer.hand[0]?.value)
      ) {
        currentPlayer.canSplit = true;
      }
      if (newHand.hand.length === 2 && newHand.hand.every((card) => card.value === newHand.hand[0]?.value)) {
        newHand.canSplit = true;
      }
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
      handleAddGameData(
        JSON.parse(JSON.stringify(currentPlayerSplitHand)),
        [...dealer],
        runningCount,
        shoe.length,
        'split'
      );
      currentPlayerSplitHand.canGetBlackJack = false;
      currentPlayerSplitHand.canSurrender = false;
      currentPlayerSplitHand.canDoubledown = true;
      currentPlayerSplitHand.canSplit = false;
      const newHand: Player = {
        ...currentPlayerSplitHand,
        hand: currentPlayerSplitHand.hand.splice(1),
        isPlaying: false,
        splitHands: [],
        playerName: currentPlayer.playerName + `-splitHand${currentPlayer.splitHands.length + 1}`
      };
      dealCard(currentPlayerSplitHand.hand);
      dealCard(newHand.hand);
      setRunningCount(
        (prevValue) =>
          prevValue + getCardCount(currentPlayerSplitHand.hand.at(-1)!) + getCardCount(newHand.hand.at(-1)!)
      );
      if (
        currentPlayerSplitHand.hand.length === 2 &&
        currentPlayerSplitHand.hand.every((card) => card.value === currentPlayerSplitHand.hand[0]?.value)
      ) {
        currentPlayerSplitHand.canSplit = true;
      }
      if (newHand.hand.length === 2 && newHand.hand.every((card) => card.value === newHand.hand[0]?.value)) {
        newHand.canSplit = true;
      }
      currentPlayer.splitHands.push(newHand);
      if (countHandValue(currentPlayerSplitHand.hand) >= 21) playNextHand(currentPlayerSplitHandIndex);
    }
    setBalance((prevValue) => prevValue - currentPlayer.bet);
    setPlayers([...players]);
  }, [players, dealer, shoe, splitHandStage, runningCount, dealCard, playNextHand, handleAddGameData]);

  //surrender current player
  const handlePlayerSurrender = useCallback(() => {
    let currentHandIndex = 2;
    const currentPlayer = players.find((player, index) => {
      if (player.isPlaying) {
        currentHandIndex = index;
        return player;
      }
      return false;
    });
    if (!currentPlayer) return;
    handleAddGameData(JSON.parse(JSON.stringify(currentPlayer)), [...dealer], runningCount, shoe.length, 'surrender');
    currentPlayer.outcome = 'surrender';
    currentPlayer.isPlaying = false;
    playNextHand(currentHandIndex);
    setPlayers([...players]);
  }, [players, dealer, shoe, runningCount, playNextHand, handleAddGameData]);

  //deal the first two cards to every player and dealer
  const startDeal = useCallback(() => {
    gameData.push([]);
    const count: Array<WithIdCard> = [];
    [...Array(2)].forEach((_el) => {
      players.forEach((player) => {
        if (player.seatTaken) {
          if (shoe.length === 0) {
            setIsNewGame((prevValue) => !prevValue);
            return;
          }
          count.push(dealCard(player.hand).at(-1)!);
          if (player.hand.length === 2 && player.hand.every((card) => card.value === player.hand[0]?.value)) {
            player.canSplit = true;
          }
        }
      });
      count.push(dealCard(dealer).at(-1)!);
    });
    dealer[1]!.isPrivate = true;
    count.pop();
    setRunningCount(
      (prevValue) =>
        prevValue +
        count.reduce((acc, curr) => {
          return acc + getCardCount(curr);
        }, 0)
    );
    setPlayers([...players]);
    setDealer([...dealer]);
    if (countDealerValue(dealer) === 21) {
      setTimeout(() => getGameResults(), 2000 + 500 * getHandsAmount());
      return;
    }
    const firstPlayer = players.find((player) => player.seatTaken === true);
    if (!firstPlayer) return;
    if (countHandValue(firstPlayer.hand) === 21) {
      if (getHandsAmount() === 1) setTimeout(() => handlePlayerStand(), 3000);
      else handlePlayerStand();
    }
  }, [dealer, players, shoe, gameData, dealCard, handlePlayerStand, getGameResults, countDealerValue, getHandsAmount]);

  //change current betting player
  const betNextHand = useCallback(
    (currentPlayerIndex: number) => {
      if (currentPlayerIndex === players.length - 1) {
        setBettingStage((prevValue) => !prevValue);
        handleSetupPlayers();
        startDeal();
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
    if (balance - bet > 5) {
      setPlayers([...players]);
      betNextHand(currentPlayerIndex);
    } else {
      players.forEach((player, index) => {
        if (index > currentPlayerIndex) player.seatTaken = false;
      });
      betNextHand(currentPlayerIndex);
      setPlayers([...players]);
    }
  }, [bet, balance, players, betNextHand]);

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
      handlePlayerSurrender,
      dealer,
      setDealer,
      shoe,
      setShoe,
      dealtCardsAmount,
      setDealtCardsAmount,
      penetrationReached,
      setPenetrationReached,
      isNewGame,
      setIsNewGame,
      dealSpeed,
      gameData,
      setGameData,
      runningCount,
      setRunningCount,
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
      handlePlayerSurrender,
      dealer,
      setDealer,
      shoe,
      setShoe,
      dealtCardsAmount,
      setDealtCardsAmount,
      penetrationReached,
      setPenetrationReached,
      isNewGame,
      setIsNewGame,
      dealSpeed,
      gameData,
      setGameData,
      runningCount,
      setRunningCount,
      setDealSpeed,
      startGame,
      startDeal,
      dealCard,
      countDealerValue
    ]
  );
};
