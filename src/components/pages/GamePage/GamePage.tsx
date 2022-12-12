import { FC } from 'react';
import Game from '../../Game/Game';
import Navbar from '../../Navbar/Navbar';
import Tools from '../../Tools/Tools';
import { StyledGamePage } from './GamePage.styles';

const GamePage: FC = () => {
  return (
    <StyledGamePage>
      <Navbar />
      <Game />
      <Tools />
    </StyledGamePage>
  );
};

export default GamePage;
