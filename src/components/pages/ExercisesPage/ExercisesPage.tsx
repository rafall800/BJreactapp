import { FC } from 'react';
import Navbar from '../../Navbar/Navbar';
import { Header1 } from '../../textStyles/Header1.styles';
import { Exercise, ExercisesBox, StyledExercisesPage } from './ExercisesPage.styles';
import CountingCardsPreview from '../../../assets/previews/CountingCards.png';
import DecisionMakingPreview from '../../../assets/previews/DecisionMaking.png';
import { useNavigate } from 'react-router-dom';
import RoutesEnum from '../../../routes/routes';

const ExercisesPage: FC = () => {
  const navigate = useNavigate();
  return (
    <StyledExercisesPage>
      <Navbar />
      <ExercisesBox>
        <Exercise>
          <Header1>cards counting</Header1>
          <img
            alt="cards counting preview"
            src={CountingCardsPreview}
            loading="lazy"
            onClick={() => navigate(RoutesEnum.CardCountingExercise)}
          />
        </Exercise>
        <Exercise>
          <Header1>decision making</Header1>
          <img
            alt="decision making preview"
            src={DecisionMakingPreview}
            loading="lazy"
            onClick={() => navigate(RoutesEnum.DecisionMakingExercise)}
          />
        </Exercise>
      </ExercisesBox>
    </StyledExercisesPage>
  );
};

export default ExercisesPage;
