import { FC, useEffect, useState } from 'react';
import About from '../../../components/About/About';
import Alert from '../../../components/Alert/Alert';
import Button from '../../../components/Button/Button';
import Card from '../../../components/Card/Card';
import CustomInput from '../../../components/CustomInput/CustomInput';
import { Paragraph } from '../../../components/textStyles/Paragrapsh.styles';
import { shuffleCards, getRandomIntInclusive, countHandValue, getCardCount } from '../../../utils/functions';
import { ExercisePlayer, WithIdCard } from '../../../utils/types';
import { AlertGrid, FillDiv } from '../../CardWagingPage/CardWagingExercise/CardWagingExercise.styles';
import { HandBox } from '../../DecisionMakingPage/DecisionMakingExercise/DecisionMakingExercise.styles';
import {
  StyledCardsBox,
  HandCountBox,
  HandCount,
  CardPlaceholder
} from '../../GamePage/Game/CardPlaceholder/CardsBox.styles';
import { KeepingCountHud, StyledKeepingCountExercise } from './KeepingCountExercise.styles';

interface AlertInterface {
  isVisible: boolean;
  message: string;
  variant: 'good' | 'bad';
}

const KeepingCountExercise: FC = () => {
  const [cards, setCards] = useState<WithIdCard[]>(shuffleCards(3));
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [player, setPlayer] = useState<ExercisePlayer>({
    hand: [],
    canSplit: false,
    canDoubledown: false,
    canSurrender: false
  });
  const [dealer, setDealer] = useState<WithIdCard[]>([]);
  const [answerCounter, setAnswerCounter] = useState<number>(0);
  const [runningCount, setRunningCount] = useState<number>(getRandomIntInclusive(-10, 10));

  console.log('runningCount');
  console.log(runningCount);
  const [userRunningCount, setUserRunningCount] = useState<number>(runningCount);
  console.log('userRunningCount');
  console.log(userRunningCount);
  const [alert, setAlert] = useState<AlertInterface>({
    isVisible: true,
    message: `Start running count is ${runningCount}`,
    variant: 'good'
  });

  const dealCards = () => {
    player.hand.splice(0, 2);
    dealer.splice(0, 2);
    let dealtCount = 0;
    for (let i = 0; i < 2; i++) {
      const newPlayerCard = cards.pop()!;
      const newDealerCard = cards.pop()!;
      player.hand.push(newPlayerCard);
      dealer.push(newDealerCard);
      dealtCount += getCardCount(newPlayerCard);
      if (i === 0) dealtCount += getCardCount(newDealerCard);
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
    setRunningCount((prevValue) => prevValue + dealtCount);
    setDealer([...dealer]);
    setPlayer(player);
    setCards([...cards]);
  };

  const handleStartGame = () => {
    setAnswerCounter(0);
    setAlert({
      isVisible: true,
      message: `Correct answers: ${answerCounter}`,
      variant: 'good'
    });
    dealCards();
    setGameRunning((prevValue) => !prevValue);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserRunningCount(Number(event.target.value));
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (runningCount === userRunningCount) {
      setAnswerCounter((prevValue) => prevValue + 1);
      dealCards();
    } else {
      setAlert({
        isVisible: true,
        message: `Oops! The correct running count was ${runningCount}`,
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

  useEffect(() => {
    if (gameRunning) setAlert({ isVisible: true, message: `Correct answers: ${answerCounter}`, variant: 'good' });
  }, [answerCounter, gameRunning]);

  return (
    <StyledKeepingCountExercise>
      <AlertGrid>
        <About>
          <Paragraph bold>
            In this exercise you have to submit running count after each round. Starting running count is not 0! It is
            randomly generated beetwen -10 and 10. You can see it on the top prompt before starting the exercise. Shoe
            is 3 decks long. Have fun!
          </Paragraph>
        </About>
        {alert.isVisible && <Alert variant={alert.variant}>{alert.message}</Alert>}
        <FillDiv />
      </AlertGrid>
      <StyledCardsBox style={{ marginTop: 20 }}>
        <HandBox>
          <HandCountBox>
            <HandCount>{dealer[0]?.value ? dealer[0]?.value : 0}</HandCount>
          </HandCountBox>
          <CardPlaceholder handsNumber={2} dealSpeed={0.5} currentHand={1}>
            {gameRunning &&
              dealer.map((card, index) => {
                return <Card key={`card${index}-${card._id}`} card={card} number={index} />;
              })}
          </CardPlaceholder>
        </HandBox>
        <HandBox>
          <HandCountBox>
            <HandCount>{countHandValue(player.hand)}</HandCount>
          </HandCountBox>
          <CardPlaceholder handsNumber={2} dealSpeed={0.5} currentHand={0}>
            {gameRunning &&
              player.hand.map((card, index) => {
                return <Card key={`card${index}-${card._id}`} card={card} number={index} />;
              })}
          </CardPlaceholder>
        </HandBox>
      </StyledCardsBox>
      <KeepingCountHud>
        {!gameRunning && (
          <Button variant="primary" onClick={handleStartGame}>
            start
          </Button>
        )}
        {gameRunning && (
          <form onSubmit={handleSubmit}>
            <HandBox>
              <CustomInput
                value={userRunningCount}
                label="Running count"
                type="number"
                spinOn
                onChange={handleChange}
              />
              <Button variant="primary" type="submit">
                answer
              </Button>
            </HandBox>
          </form>
        )}
      </KeepingCountHud>
    </StyledKeepingCountExercise>
  );
};

export default KeepingCountExercise;
