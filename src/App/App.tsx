import { FC } from 'react';
import { StyledCenterContainer } from './App.styles';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RoutesEnum from '../utils/routes';
import LandingPage from '../pages/LandingPage/LandingPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalStyles } from '../globalStyles';
import GamePage from '../pages/GamePage/GamePage';
import ExercisesPage from '../pages/ExercisesPage/ExercisesPage';
import DecisionMakingPage from '../pages/DecisionMakingPage/DecisionMakingPage';
import ArticlesPage from '../pages/ArticlesPage/ArticlesPage';
import HowToPlay from '../pages/ArticlesPage/HowToPlay/HowToPlay';
import HowToCountCards from '../pages/ArticlesPage/HowToCountCards/HowToCountCards';
import KeepingCountPage from '../pages/KeepingCountPage/KeepingCoountPage';
import CardsWagingPage from '../pages/CardWagingPage/CardWagingPage';

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
        <Route path={RoutesEnum.CardsWagingExercise} element={<CardsWagingPage />} />
        <Route path={RoutesEnum.DecisionMakingExercise} element={<DecisionMakingPage />} />
        <Route path={RoutesEnum.KeepingCountExercise} element={<KeepingCountPage />} />
        <Route path={RoutesEnum.ArticlesPage} element={<ArticlesPage />}>
          <Route index element={<HowToPlay />} />
          <Route path={RoutesEnum.HowToPlay} element={<HowToPlay />} />
          <Route path={RoutesEnum.HowToCountCards} element={<HowToCountCards />} />
        </Route>
      </Routes>
    </StyledCenterContainer>
    <GlobalStyles />
  </QueryClientProvider>
);

export default App;
