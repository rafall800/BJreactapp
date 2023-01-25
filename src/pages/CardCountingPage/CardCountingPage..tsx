import { FC } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { RelativeBox, GameTable } from '../GamePage/Game/Game.styles';
import CardCountingExercise from './CardCountingExercise/CardCountingExercise';
import { StyledCardCountingPage } from './CardCountingPage.styles';

const CardCountingPage: FC = () => {
  return (
    <StyledCardCountingPage>
      <Navbar />
      <RelativeBox>
        <GameTable />
      </RelativeBox>
      <CardCountingExercise />
    </StyledCardCountingPage>
  );
};

export default CardCountingPage;
