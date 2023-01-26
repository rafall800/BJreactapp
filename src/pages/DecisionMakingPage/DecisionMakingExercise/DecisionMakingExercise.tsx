import { FC, useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import Card from '../../../components/Card/Card';
import {
  shuffleCards,
  countHandValue,
  BASIC_STRATEGY_SPLITS,
  BASIC_STRATEGY_SOFT,
  BASIC_STRATEGY_HARD
} from '../../../utils/functions';
import { WithIdCard, Options } from '../../../utils/types';
import { Alert } from '../../CardCountingPage/CardWagingExercise/CardWagingExercise.styles';
import {
  StyledCardsBox,
  CardPlaceholder,
  HandCountBox,
  HandCount
} from '../../GamePage/Game/CardPlaceholder/CardsBox.styles';
import { DecisionOptions, Decisions, FlexBox } from '../../GamePage/Game/Hud/Hud.styles';
import { HandBox, Hud, StyledDecisionMakingExercise } from './DecisionMakingExercise.styles';
interface AlertInterface {
  isVisible: boolean;
  message: string;
  variant: 'good' | 'bad';
}

interface Player {
  hand: WithIdCard[];
  canSplit: boolean;
  canSurrender: boolean;
  canDoubledown: boolean;
}

const DecisionMakingExercise: FC = () => {
  const [cards, setCards] = useState<WithIdCard[]>(shuffleCards(3));
  const [counter, setCounter] = useState<number>(0);
  const [alert, setAlert] = useState<AlertInterface>({
    isVisible: true,
    message: `Correct answers: ${counter}`,
    variant: 'good'
  });
  const [player, setPlayer] = useState<Player>({
    hand: [],
    canSplit: false,
    canDoubledown: false,
    canSurrender: false
  });
  const [dealer, setDealer] = useState<WithIdCard[]>([]);
  const [gameRunning, setGameRunning] = useState<boolean>(false);

  const dealCards = () => {
    player.hand.splice(0, 2);
    dealer.splice(0, 2);
    for (let i = 0; i < 2; i++) {
      player.hand.push(cards.pop()!);
      dealer.push(cards.pop()!);
    }
    if (countHandValue(player.hand) === 21) {
      dealCards();
      return;
    }
    dealer.at(-1)!.isPrivate = true;
    if (player.hand[0]?.value === player.hand[1]?.value) player.canSplit = true;
    else player.canSplit = false;
    player.canDoubledown = Boolean(Math.round(Math.random()));
    player.canSurrender = Boolean(Math.round(Math.random()));
    setDealer([...dealer]);
    setPlayer(player);
    setCards([...cards]);
  };

  const handleStartGame = () => {
    setCounter(0);
    setAlert({
      isVisible: true,
      message: `Correct answers: ${counter}`,
      variant: 'good'
    });
    dealCards();
    setGameRunning((prevValue) => !prevValue);
  };
  const handlePlayerChoose = (option: Options) => {
    let dealer0 = dealer.at(0)!;
    let bestOption: Options | '' = '';
    const playerValue = countHandValue(player.hand);
    //surrender
    if (player.canSurrender) {
      if (playerValue === 17 && dealer0.value === 'A') bestOption = 'surrender';
      if (playerValue === 16 && ['9', '10', 'A'].includes(dealer0.value)) bestOption = 'surrender';
      if (playerValue === 15 && dealer0.value === '10') bestOption = 'surrender';
    }
    //split
    if (!bestOption && player.canSplit) {
      if (BASIC_STRATEGY_SPLITS[player.hand[0]!.value][dealer0.value] === 'y') bestOption = 'split';
    }
    //soft
    if (!bestOption && player.hand.find((card) => card.value === 'A')) {
      switch (BASIC_STRATEGY_SOFT[playerValue.toString()][dealer0.value]) {
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
    //hard
    if (!bestOption) {
      switch (BASIC_STRATEGY_HARD[countHandValue(player.hand).toString()][dealer0.value]) {
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
    if (option === bestOption) {
      setCounter((prevValue) => prevValue + 1);
      dealCards();
    } else {
      setAlert({
        isVisible: true,
        message: `Oops! The correct option was ${bestOption}`,
        variant: 'bad'
      });
      setCards(shuffleCards(3));
      setDealer([]);
      setPlayer({
        hand: [],
        canSplit: false,
        canDoubledown: false,
        canSurrender: false
      });
      setGameRunning((prevValue) => !prevValue);
    }
  };
  const countDealerValue = (cards: WithIdCard[]): number => {
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
      cards.find((card) => card.value.includes('A')) &&
      cards.find((card) => card.value.includes('6'))
    ) {
      return 7;
    }
    return countHandValue(cards);
  };

  useEffect(() => {
    if (cards.length === 0) {
      setAlert({ isVisible: true, message: 'Well done!', variant: 'good' });
      setCards(shuffleCards(3));
      setTimeout(() => {
        setDealer([]);
        setPlayer({
          hand: [],
          canSplit: false,
          canDoubledown: false,
          canSurrender: false
        });
        setGameRunning((prevValue) => !prevValue);
      }, 3000);
    }
  }, [cards, counter]);

  useEffect(() => {
    setAlert({ isVisible: true, message: `Correct answers: ${counter}`, variant: 'good' });
  }, [counter]);

  return (
    <StyledDecisionMakingExercise>
      {alert.isVisible && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <StyledCardsBox style={{ marginTop: 20 }}>
        <HandBox>
          <HandCountBox>
            <HandCount>{countDealerValue(dealer)}</HandCount>
          </HandCountBox>
          <CardPlaceholder handsNumber={2} dealSpeed={0.5} currentHand={1}>
            {dealer.map((card, index) => {
              return <Card key={`card${index}-${Math.random()}`} card={card} number={index} />;
            })}
          </CardPlaceholder>
        </HandBox>
        <HandBox>
          <HandCountBox>
            <HandCount>{countHandValue(player.hand)}</HandCount>
          </HandCountBox>
          <CardPlaceholder handsNumber={2} dealSpeed={0.5} currentHand={0}>
            {player.hand.map((card, index) => {
              return <Card key={`card${index}-${Math.random()}`} card={card} number={index} />;
            })}
          </CardPlaceholder>
        </HandBox>
      </StyledCardsBox>
      <Hud>
        {!gameRunning && (
          <Button variant="primary" onClick={handleStartGame}>
            start
          </Button>
        )}
        {gameRunning && (
          <DecisionOptions>
            <Decisions>
              <FlexBox>
                <Button variant="primary" onClick={() => handlePlayerChoose('hit')}>
                  hit
                </Button>
                <Button
                  variant="doubledown"
                  disabled={!player.canDoubledown}
                  onClick={() => handlePlayerChoose('doubleDown')}
                >
                  x2
                </Button>
                <Button variant="stand" onClick={() => handlePlayerChoose('stand')}>
                  stand
                </Button>
              </FlexBox>
              <FlexBox>
                <Button variant="split" disabled={!player.canSplit} onClick={() => handlePlayerChoose('split')}>
                  split
                </Button>
                <Button
                  variant="surrender"
                  disabled={!player.canSurrender}
                  onClick={() => handlePlayerChoose('surrender')}
                >
                  surr
                </Button>
              </FlexBox>
            </Decisions>
          </DecisionOptions>
        )}
      </Hud>
    </StyledDecisionMakingExercise>
  );
};

export default DecisionMakingExercise;
