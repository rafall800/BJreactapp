import { FC } from 'react';
import { StyledCenterContainer } from './App.styles';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import RoutesEnum from '../../routes/routes';
import LandingPage from '../pages/LandingPage/LandingPage';
import { QueryClient, QueryClientProvider } from 'react-query';
import { GlobalStyles } from '../globalStyles';
import GamePage from '../pages/GamePage/GamePage';
import { DialogProvider } from '../../contexts/DialogContext';

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
    <DialogProvider>
      <StyledCenterContainer>
        <Routes>
          <Route path="*" element={<Navigate to={RoutesEnum.LandingPage} />}></Route>
          <Route path={RoutesEnum.LandingPage} element={<LandingPage />} />
          <Route path={RoutesEnum.GamePage} element={<GamePage />} />
        </Routes>
      </StyledCenterContainer>
    </DialogProvider>
    <GlobalStyles />
  </QueryClientProvider>
);

export default App;
