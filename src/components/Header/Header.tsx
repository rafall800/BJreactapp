import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import RoutesEnum from '../../routes/routes';
import Button from '../Button/Button';
import { CardPlaceholder, CardPlaceholderBox } from '../Game/CardPlaceholder/CardsBox.styles';
import { Header1 } from '../textStyles/Header1.styles';
import { Header2 } from '../textStyles/Header2.styles';
import { Background, StyledHeader } from './Header.styles';

const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <CardPlaceholder>
        <Header1>learn blackjack</Header1>
      </CardPlaceholder>
      <Header2>inside out</Header2>
      <Button variant="primary">learn the rules</Button>
      <CardPlaceholderBox>
        <CardPlaceholder id="card1"></CardPlaceholder>
        <CardPlaceholder id="card2">
          <Button variant="transparent" onClick={() => navigate(RoutesEnum.GamePage)}>
            start playing
          </Button>
        </CardPlaceholder>
        <CardPlaceholder id="card3">
          <Button variant="transparent">start course</Button>
        </CardPlaceholder>
        <CardPlaceholder id="card4">
          <Button variant="transparent">do exercise</Button>
        </CardPlaceholder>
        <CardPlaceholder id="card5"></CardPlaceholder>
      </CardPlaceholderBox>
      <Background />
    </StyledHeader>
  );
};

export default Header;
