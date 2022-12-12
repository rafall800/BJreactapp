import { FC } from 'react';
import { GameTable, GameTableContent, StyledGame } from './Game.styles';
import CardsBox from './CardPlaceholder/CardsBox';
import Hud from './Hud/Hud';

const Game: FC = () => {
  return (
    <StyledGame>
      <GameTableContent>
        <CardsBox />
        <Hud />
      </GameTableContent>
      <GameTable />
    </StyledGame>
  );
};

export default Game;
