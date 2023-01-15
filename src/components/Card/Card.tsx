import { FC } from 'react';
import { useDynamicSVGImport } from '../../hooks/UseDynamicSvg';
import { StyledCard } from './Card.styles';
import { ReactComponent as BackCard } from '../../assets/cards/back.svg';
import { WithIdCard } from '../pages/GamePage/GameManager/util';

interface CardProps {
  card: WithIdCard;
  number: number;
  viewBox?: string;
  height?: string;
}

const Icon: FC<CardProps> = ({ card, number, viewBox, height }) => {
  const { SvgIcon } = useDynamicSVGImport(card.value);
  if (SvgIcon) {
    if (!viewBox) {
      viewBox = '0 0 360 540';
      height = '540';
    }
    return (
      <StyledCard id="card" number={number}>
        {card.isPrivate && <BackCard style={{ position: 'absolute' }} />}
        <SvgIcon id="frontCard" height={height} viewBox={viewBox} />
      </StyledCard>
    );
  }
  return null;
};

export default Icon;
