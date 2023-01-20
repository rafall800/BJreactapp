import { FC, useEffect, useState } from 'react';
import Button from '../../../Button/Button';
import Card from '../../../Card/Card';
import { getCardCount, shuffleCards, WithIdCard } from '../../GamePage/GameManager/util';
import { Alert, ButtonBox, SingleCardPlaceholder, StyledCardCountingExercise } from './CardCountingExercise.styles';

interface AlertInterface {
  isVisible: boolean;
  message: string;
  variant: 'good' | 'bad';
}

const CardCountingExercise: FC = () => {
  const [cards, setCards] = useState<WithIdCard[]>(shuffleCards(1));
  const [gameRunning, setGameRunning] = useState<boolean>(false);
  const [currentCard, setCurrentCard] = useState<WithIdCard>();
  const [alert, setAlert] = useState<AlertInterface>({ isVisible: false, message: '', variant: 'bad' });

  const handleStartGame = () => {
    setAlert({ isVisible: false, message: '', variant: 'bad' });
    setCurrentCard(cards.pop());
    setCards([...cards]);
    setGameRunning((prevValue) => !prevValue);
  };

  useEffect(() => {
    if (cards.length === 0) {
      setAlert({ isVisible: true, message: 'Well done!', variant: 'good' });
      setCards(shuffleCards(1));
      setTimeout(() => {
        setAlert({ isVisible: false, message: '', variant: 'bad' });
        setCurrentCard(undefined);
        setGameRunning((prevValue) => !prevValue);
      }, 3000);
    }
  }, [cards, currentCard]);

  const handleGuessValue = (choosenValue: number) => {
    if (!currentCard) return;
    if (choosenValue === getCardCount(currentCard)) {
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
      {alert.isVisible && currentCard && <Alert variant={alert.variant}>{alert.message}</Alert>}
      <SingleCardPlaceholder>{currentCard && <Card card={currentCard} number={0} />}</SingleCardPlaceholder>
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

export default CardCountingExercise;
