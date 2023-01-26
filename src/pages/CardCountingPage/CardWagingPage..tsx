import { FC } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { RelativeBox, GameTable } from '../GamePage/Game/Game.styles';
import CardWagingExercise from './CardWagingExercise/CardWagingExercise';
import { StyledCardCountingPage } from './CardWagingPage.styles';

const CardCountingPage: FC = () => {
  return (
    <StyledCardCountingPage>
      <Navbar />
      <RelativeBox>
        <GameTable />
      </RelativeBox>
      <CardWagingExercise />
    </StyledCardCountingPage>
  );
};

export default CardCountingPage;
