import { FC, useEffect, useRef, useState } from 'react';
import { StyledCard } from './Card.styles';

interface CardProps {
  symbol: string;
  number: number;
}

const Card: FC<CardProps> = ({ symbol, number }) => {
  const [icon, setIcon] = useState('');
  const cardRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    async function fetchData() {
      const importedIcon = await import(`../../assets/cards/${symbol}.svg`);
      setIcon(importedIcon.default);
    }
    if (cardRef.current) {
      cardRef.current.style.transform = `translate(${number * 15}px,${number * -5}px)`;
      cardRef.current.style.zIndex = number.toString();
    }
    fetchData();
  }, [symbol, number]);

  return <StyledCard ref={cardRef} alt="card" src={icon} loading="lazy" />;
};

export default Card;
