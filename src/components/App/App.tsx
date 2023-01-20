import { FC } from 'react';
import { StyledCenterContainer } from './App.styles';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RoutesEnum from '../../routes/routes';
import LandingPage from '../pages/LandingPage/LandingPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalStyles } from '../globalStyles';
import GamePage from '../pages/GamePage/GamePage';
import ExercisesPage from '../pages/ExercisesPage/ExercisesPage';
import CardCountingPage from '../pages/CardCountingPage/CardCountingPage.';
import DecisionMakingPage from '../pages/DecisionMakingPage/DecisionMakingPage';

export const queryClient = new QueryClient();

const App: FC = () => {
  return (
    <BrowserRouter basename="/">
      <InnerApp queryClient={queryClient} />
    </BrowserRouter>
  );
};

export interface InnerAppProps {
  queryClient: QueryClient;
}

export const InnerApp: FC<InnerAppProps> = ({ queryClient }) => (
  <QueryClientProvider client={queryClient}>
    <StyledCenterContainer>
      <Routes>
        <Route path="*" element={<Navigate to={RoutesEnum.LandingPage} />}></Route>
        <Route path={RoutesEnum.LandingPage} element={<LandingPage />} />
        <Route path={RoutesEnum.GamePage} element={<GamePage />} />
        <Route path={RoutesEnum.ExercisesPage} element={<ExercisesPage />} />
        <Route path={RoutesEnum.CardCountingExercise} element={<CardCountingPage />} />
        <Route path={RoutesEnum.DecisionMakingExercise} element={<DecisionMakingPage />} />
      </Routes>
    </StyledCenterContainer>
    <GlobalStyles />
  </QueryClientProvider>
);

export default App;
