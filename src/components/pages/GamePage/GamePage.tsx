import { FC } from 'react';
import Game from '../../Game/Game';
import GameSettings from '../../GameSettings/GameSettings';
import Navbar from '../../Navbar/Navbar';
import Tools from '../../Tools/Tools';
import { StyledGamePage } from './GamePage.styles';
import { GameProvider } from './GameManager/GameProvider';

const GamePage: FC = () => {
  return (
    <StyledGamePage>
      <Navbar />
      <GameProvider>
        <Game />
        <Tools />
        <GameSettings />
      </GameProvider>
    </StyledGamePage>
  );
};

export default GamePage;
