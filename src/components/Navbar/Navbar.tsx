import { FC, useEffect, useRef, useState } from 'react';
import Button from '../Button/Button';
import Hamburger from './Hamburger/Hamburger';
import { Collapsible, Content, StyledNavbar, Tabs } from './Navbar.styles';
import { ReactComponent as ChipIcon } from '../../assets/CasinoChip.svg';
import { useNavigate } from 'react-router-dom';
import RoutesEnum from '../../routes/routes';

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
      title: 'start course'
    },
    {
      id: '2',
      title: 'read articles',
      onClick: () => navigate(RoutesEnum.ArticlesPage)
    },
    {
      id: '3',
      title: 'do exercises'
    },
    {
      id: '4',
      title: 'play blackjack',
      onClick: () => navigate(RoutesEnum.GamePage)
    },
    {
      id: '5',
      title: 'settings'
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
        <Button id="singin-navbar" variant="primary">
          sing in
        </Button>
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
        </Tabs>
        <Button id="singin-collapsible" variant="primary">
          sing in
        </Button>
      </Collapsible>
    </StyledNavbar>
  );
};

export default Navbar;
