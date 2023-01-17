import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';
import { WithIdCard } from '../pages/GamePage/GameManager/util';
import { ReactComponent as BackCard } from '../../assets/cards/back.svg';
import { theme } from '../theme';

interface CardProps {
  number: number;
}

export const StyledCard = styled.div<CardProps>`
  position: absolute;
  ${({ number }: CardProps) => css`
    top: ${number * -5}px;
    left: ${number * 15}px;
  `};
  width: 100%;
  height: 100%;
  #frontCard {
    border: 1px solid ${theme.colorStyles.Black};
    border-radius: 8px;
  }
  #backCard {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media (min-width: 1100px) {
      border-radius: 10px;
    }
  }
`;

interface TEstInterface {
  card: WithIdCard;
  number: number;
}

const Test: FC<TEstInterface> = ({ card, number }) => {
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

export default Test;
