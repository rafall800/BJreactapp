import { FC } from 'react';
import { useDynamicSVGImport } from '../../hooks/UseDynamicSvg';
import { StyledCard } from './Card.styles';
import { ReactComponent as BackCard } from '../../assets/cards/back.svg';
import { WithIdCard } from '../pages/GamePage/GameManager/util';

interface CardProps {
  card: WithIdCard;
  number: number;
}

const Icon: FC<CardProps> = ({ card, number }) => {
  const { SvgIcon } = useDynamicSVGImport(card.value);
  if (SvgIcon) {
    return (
      <StyledCard id="card" number={number}>
        {card.isPrivate && <BackCard style={{ position: 'absolute' }} />}
        <SvgIcon id="frontCard" />
      </StyledCard>
    );
  }
  return null;
};

export default Icon;
