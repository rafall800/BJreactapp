import { FC } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { RelativeBox, GameTable } from '../GamePage/Game/Game.styles';
import DecisionMakingExercise from './DecisionMakingExercise/DecisionMakingExercise';
import { StyledDecisionMakingPage } from './DecisionMakingPage.styles';

const DecisionMakingPage: FC = () => {
  return (
    <StyledDecisionMakingPage>
      <Navbar />
      <RelativeBox>
        <GameTable />
      </RelativeBox>
      <DecisionMakingExercise />
    </StyledDecisionMakingPage>
  );
};

export default DecisionMakingPage;
