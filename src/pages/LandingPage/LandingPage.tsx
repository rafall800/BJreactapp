import { FC } from 'react';
import Header from './Header/Header';
import LandingPageContent from './LandingPageContent/LandingPageContent';
import { StyledLandingPage } from './LandingPage.styles';
import Navbar from '../../components/Navbar/Navbar';

const LandingPage: FC = () => {
  return (
    <StyledLandingPage>
      <Navbar />
      <Header />
      <LandingPageContent />
    </StyledLandingPage>
  );
};

export default LandingPage;
