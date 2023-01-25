import React from 'react';
import { Header2 } from '../../../../../components/textStyles/Header2.styles';
import { StyledNavigationTab } from './NavigationTab.styles';

interface NavigationTabProps {
  title: string;
  index: number;
  setActiveTab: (index: number) => void;
  isActive: boolean;
}

const NavigationTab: React.FC<NavigationTabProps> = ({ title, index, setActiveTab, isActive }) => {
  return (
    <StyledNavigationTab onClick={() => setActiveTab(index)} active={isActive}>
      <Header2>{title}</Header2>
    </StyledNavigationTab>
  );
};

export default NavigationTab;
