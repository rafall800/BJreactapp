import { FC, useEffect, useState } from 'react';
import { WithIdCard } from '../pages/GamePage/GameManager/util';
import { ReactComponent as BackCard } from '../../assets/cards/back.svg';
import { StyledCard } from './Card.styles';

interface TEstInterface {
  card: WithIdCard;
  number: number;
}

const Card: FC<TEstInterface> = ({ card, number }) => {
  let [icon, setIcon] = useState('');

  useEffect(() => {
    const importIcon = async () => {
      let importedIcon = await import(`../../assets/cards/${card.symbol}.svg`);
      setIcon(importedIcon.default);
    };
    importIcon();
  }, [card]);

  return (
    <StyledCard id="card" number={number}>
      {card.isPrivate && <BackCard id="backCard" />}
      <img id="frontCard" alt="card" src={icon} />
    </StyledCard>
  );
};

export default Card;
