import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button/Button';
import { Header1 } from '../../../components/textStyles/Header1.styles';
import { Header2 } from '../../../components/textStyles/Header2.styles';
import RoutesEnum from '../../../utils/routes';
import { Background, CardBorder, CardBorderBox, StyledHeader } from './Header.styles';

const Header: FC = () => {
  const navigate = useNavigate();
  return (
    <StyledHeader>
      <CardBorder>
        <Header1>learn blackjack</Header1>
      </CardBorder>
      <Header2>inside out</Header2>
      <CardBorderBox>
        <CardBorder>
          <Button variant="transparent" onClick={() => navigate(RoutesEnum.GamePage)}>
            play blackjack
          </Button>
        </CardBorder>
        <CardBorder>
          <Button variant="transparent" onClick={() => navigate(RoutesEnum.ArticlesPage)}>
            learn
          </Button>
        </CardBorder>
        <CardBorder>
          <Button variant="transparent" onClick={() => navigate(RoutesEnum.ExercisesPage)}>
            do exercises
          </Button>
        </CardBorder>
      </CardBorderBox>
      <Background />
    </StyledHeader>
  );
};

export default Header;
