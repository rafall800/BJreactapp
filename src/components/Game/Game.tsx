import { FC, useContext } from 'react';
import { GameTable, GameTableContent, StyledGame } from './Game.styles';
import CardsBox from './CardPlaceholder/CardsBox';
import Hud from './Hud/Hud';
import StartGameDialog from './StartGameDialog/StartGameDialog';
import { BlackJackGameContext } from '../pages/GamePage/GameManager/GameProvider';

const Game: FC = () => {
  const { isNewGame } = useContext(BlackJackGameContext);
  return (
    <StyledGame>
      {isNewGame && <StartGameDialog />}
      <GameTableContent>
        <CardsBox />
        <Hud />
      </GameTableContent>
      <GameTable />
    </StyledGame>
  );
};

export default Game;
