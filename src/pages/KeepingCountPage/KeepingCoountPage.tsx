import { FC } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { RelativeBox, GameTable } from '../GamePage/Game/Game.styles';
import KeepingCountExercise from './KeepingcountExercise/KeepingCountExercise';
import { StyledKeepingCountPage } from './KeepingCountPage.styles';

const KeepingCountPage: FC = () => {
  return (
    <StyledKeepingCountPage>
      <Navbar />
      <RelativeBox>
        <GameTable />
      </RelativeBox>
      <KeepingCountExercise />
    </StyledKeepingCountPage>
  );
};

export default KeepingCountPage;
