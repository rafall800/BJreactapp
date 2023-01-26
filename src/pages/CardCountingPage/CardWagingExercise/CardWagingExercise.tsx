import { FC, useEffect, useState } from 'react';
import Button from '../../../components/Button/Button';
import Card from '../../../components/Card/Card';
import { shuffleCards, getCardCount } from '../../../utils/functions';
import { WithIdCard } from '../../../utils/types';
import { Alert, ButtonBox, SingleCardPlaceholder, StyledCardCountingExercise } from './CardWagingExercise.styles';

interface AlertInterface {
  isVisible: boolean;
  message: string;
  variant: 'good' | 'bad';
}

const CardWagingExercise: FC = () => {
  const [cards, setCards] = useState<WithIdCard[]>(shuffleCards(1).slice(0, 3));
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<WithIdCard>();
  const [counter, setCounter] = useState<number>(0);
  const [alert, setAlert] = useState<AlertInterface>({
    isVisible: true,
    message: `Correct answers: ${counter}`,
    variant: 'good'
  });

  const handleStartGame = () => {
    setCounter(0);
    setAlert({
      isVisible: true,
      message: `Correct answers: ${counter}`,
      variant: 'good'
    });
    setCurrentCard(cards.pop());
    setCards([...cards]);
    setGameRunning((prevValue) => !prevValue);
  };

  // useEffect(() => {
  //   if (cards.length === 0) {
  //     setAlert({ isVisible: true, message: 'Well done!', variant: 'good' });
  //     setCards(shuffleCards(1));
  //     setTimeout(() => {
  //       setCurrentCard(undefined);
  //       setGameRunning((prevValue) => !prevValue);
  //     }, 3000);
  //   }
  // }, [cards, currentCard, counter]);

  useEffect(() => {
    if (gameRunning) setAlert({ isVisible: true, message: `Correct answers: ${counter}`, variant: 'good' });
  }, [counter, gameRunning]);

  const handleGuessValue = (choosenValue: number) => {
    if (!currentCard) return;
    if (choosenValue === getCardCount(currentCard)) {
      setCounter((prevValue) => prevValue + 1);
      if (cards.length === 0) {
        setAlert({ isVisible: true, message: 'Well done!', variant: 'good' });
        setCards(shuffleCards(1));
        setCurrentCard(undefined);
        setGameRunning((prevValue) => !prevValue);
        return;
      }
      setCurrentCard(cards.pop());
      setCards([...cards]);
    } else {
      setAlert({
        isVisible: true,
        message: `Oops! The correct value was ${getCardCount(currentCard)}`,
        variant: 'bad'
      });
      setCards(shuffleCards(1));
      setGameRunning((prevValue) => !prevValue);
    }
  };

  return (
    <StyledCardCountingExercise>
      {alert.isVisible && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <SingleCardPlaceholder>
        {currentCard && <Card key={Math.random()} card={currentCard} number={0} />}
      </SingleCardPlaceholder>
      {!gameRunning && (
        <Button variant="primary" onClick={handleStartGame}>
          start
        </Button>
      )}
      {gameRunning && (
        <ButtonBox>
          <Button variant="primary" onClick={() => handleGuessValue(1)}>
            +1
          </Button>
          <Button variant="surrender" onClick={() => handleGuessValue(0)}>
            0
          </Button>
          <Button variant="stand" onClick={() => handleGuessValue(-1)}>
            -1
          </Button>
        </ButtonBox>
      )}
    </StyledCardCountingExercise>
  );
};

export default CardWagingExercise;
