import { FC, useContext } from 'react';
import { GameTable, GameTableContent, RelativeBox, StyledGame } from './Game.styles';
import CardsBox from './CardPlaceholder/CardsBox';
import Hud from './Hud/Hud';
import StartGameDialog from './StartGameDialog/StartGameDialog';
import { BlackJackGameContext } from '../../../contexts/GameProvider';

const Game: FC = () => {
  const { isNewGame } = useContext(BlackJackGameContext);
  return (
    <StyledGame>
      {isNewGame && <StartGameDialog />}
      <RelativeBox>
        <GameTable />
      </RelativeBox>
      <GameTableContent>
        <CardsBox />
        <Hud />
      </GameTableContent>
    </StyledGame>
  );
};

export default Game;
