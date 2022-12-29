import { FC } from 'react';
import { GameTable, GameTableContent, StyledGame } from './Game.styles';
import CardsBox from './CardPlaceholder/CardsBox';
import Hud from './Hud/Hud';
import { GameProvider } from './GameManager/GameProvider';

const Game: FC = () => {
  return (
    <StyledGame>
      <GameProvider>
        <GameTableContent>
          <CardsBox />
          <Hud />
        </GameTableContent>
        <GameTable />
      </GameProvider>
    </StyledGame>
  );
};

export default Game;
