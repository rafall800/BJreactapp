import { FC } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { RelativeBox, GameTable } from '../GamePage/Game/Game.styles';
import CardWagingExercise from './CardWagingExercise/CardWagingExercise';
import { StyledCardsWagingPage } from './CardWagingPage.styles';

const CardsWagingPage: FC = () => {
  return (
    <StyledCardsWagingPage>
      <Navbar />
      <RelativeBox>
        <GameTable />
      </RelativeBox>
      <CardWagingExercise />
    </StyledCardsWagingPage>
  );
};

export default CardsWagingPage;
