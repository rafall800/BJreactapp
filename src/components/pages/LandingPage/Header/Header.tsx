import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import RoutesEnum from '../../../../routes/routes';
import Button from '../../../Button/Button';
import { CardBorder, CardBorderBox } from './Header.styles';
import { Header1 } from '../../../textStyles/Header1.styles';
import { Header2 } from '../../../textStyles/Header2.styles';
import { Background, StyledHeader } from './Header.styles';

const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <CardBorder>
        <Header1>learn blackjack</Header1>
      </CardBorder>
      <Header2>inside out</Header2>
      <Button variant="primary">learn the rules</Button>
      <CardBorderBox>
        <CardBorder>
          <Button variant="transparent" onClick={() => navigate(RoutesEnum.GamePage)}>
            start playing
          </Button>
        </CardBorder>
        <CardBorder>
          <Button variant="transparent">start course</Button>
        </CardBorder>
        <CardBorder>
          <Button variant="transparent" onClick={() => navigate(RoutesEnum.ExercisesPage)}>
            do exercise
          </Button>
        </CardBorder>
      </CardBorderBox>
      <Background />
    </StyledHeader>
  );
};

export default Header;
