import { FC } from 'react';
import { RelativeBox, GameTable } from '../../Game/Game.styles';
import Navbar from '../../Navbar/Navbar';
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
