import { FC, useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import Hamburger from './Hamburger/Hamburger';
import { Collapsible, Content, StyledNavbar, Tabs } from './Navbar.styles';
import { ReactComponent as ChipIcon } from '../../assets/CasinoChip.svg';
import { useNavigate } from 'react-router-dom';
import RoutesEnum from '../../utils/routes';

interface TabProps {
  id: string;
  title: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const collapsibleRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const tabs: TabProps[] = [
    {
      id: '1',
      title: 'read articles',
      onClick: () => navigate(RoutesEnum.ArticlesPage)
    },
    {
      id: '2',
      title: 'do exercises'
    },
    {
      id: '3',
      title: 'play blackjack',
      onClick: () => navigate(RoutesEnum.GamePage)
    }
  ];
  useEffect(() => {
    if (isOpen && collapsibleRef.current)
      collapsibleRef.current.style.height = collapsibleRef.current.scrollHeight.toString().concat('px');
    else if (collapsibleRef.current) collapsibleRef.current.style.height = '0px';
  });
  return (
    <StyledNavbar>
      <Content>
        <Hamburger id="hamburger" onClick={() => setIsOpen(!isOpen)} />
        <ChipIcon onClick={() => navigate(RoutesEnum.LandingPage)} />
      </Content>
      <Collapsible ref={collapsibleRef}>
        <Tabs>
          {tabs.map((tab) => {
            return (
              <Button key={tab.id} variant="tab" onClick={tab.onClick}>
                {tab.title}
              </Button>
            );
          })}
          <div style={{ height: '100px' }}></div>
        </Tabs>
      </Collapsible>
    </StyledNavbar>
  );
};

export default Navbar;
