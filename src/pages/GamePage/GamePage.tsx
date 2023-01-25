import { FC } from 'react';
import { StyledGamePage } from './GamePage.styles';
import { GameProvider } from '../../contexts/GameProvider';
import Navbar from '../../components/Navbar/Navbar';
import Game from './Game/Game';
import GameSettings from './GameSettings/GameSettings';
import Tools from './Tools/Tools';

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
