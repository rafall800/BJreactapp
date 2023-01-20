import { FC } from 'react';
import { RelativeBox, GameTable } from '../../Game/Game.styles';
import Navbar from '../../Navbar/Navbar';
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
