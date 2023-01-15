import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { FC, useEffect, useState } from 'react';
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
  #frontCard {
    border: 1px solid ${theme.colorStyles.Black};
    border-radius: 8px;
  }
  img {
    width: 100%;
    height: 100%;
    @media (min-width: 1100px) {
      border-radius: 10px;
    }
  }
`;

interface TEstInterface {
  symbol: string;
  number: number;
}

const Test: FC<TEstInterface> = ({ symbol, number }) => {
  let [icon, setIcon] = useState('');

  useEffect(() => {
    const importIcon = async () => {
      let importedIcon = await import(`../../assets/cards/${symbol}.svg`);
      setIcon(importedIcon.default);
    };
    importIcon();
  }, [symbol]);

  return (
    <StyledCard id="card" number={number}>
      <img id="frontCard" alt="card" src={icon} />
    </StyledCard>
  );
};

export default Test;
