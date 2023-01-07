import { FC } from 'react';
import Header from './Header/Header';
import LandingPageContent from '../../LandingPageContent/LandingPageContent';
import Navbar from '../../Navbar/Navbar';
import { StyledLandingPage } from './LandingPage.styles';

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
