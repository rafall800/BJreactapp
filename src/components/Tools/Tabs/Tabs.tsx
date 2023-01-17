import React, { ReactElement, useState } from 'react';
import NavigationTab from './NavigationTab/NavigationTab';
import { StyledNavigation, StyledTabs } from './Tabs.styles';

interface Props {
  children: ReactElement[];
}

const Tabs: React.FC<Props> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<number>(0);
  return (
    <StyledTabs>
      <StyledNavigation>
        {children.map((item, index) => (
          <NavigationTab
            key={`NavigationTab${index + 1}`}
            title={item.props.title}
            index={index}
            setActiveTab={setActiveTab}
            isActive={activeTab === index ? true : false}
          />
        ))}
      </StyledNavigation>
      {children[activeTab]}
    </StyledTabs>
  );
};

export default Tabs;
