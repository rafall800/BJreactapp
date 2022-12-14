import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../../theme';

interface CardPLaceholderProps {
  dealSpeed: number;
  handsNumber: number;
  currentHand: number;
}

const dealDelay = 0.2;

export const StyledCardsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  margin-top: 60px;
`;

export const TopHud = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;

  width: 100%;
`;

export const DealtCards = styled.div`
  height: 160px;
  width: 100px;
  background-color: pink;
`;

export const Shoe = styled.div`
  height: 50px;
  width: 240px;
  background-color: blue;
`;

export const CardPlaceholderBox = styled.div`
  display: flex;
  gap: 130px;

  #player1,
  #player2,
  #player4,
  #player5 {
    display: none;
  }

  @media (min-width: 575px) {
    #player4 {
      display: flex;
    }
  }
  @media (min-width: 800px) {
    #player2 {
      display: flex;
    }
  }
  @media (min-width: 1100px) {
    #player5 {
      display: flex;
    }
  }
  @media (min-width: 1350px) {
    #player1 {
      display: flex;
    }
  }
`;

export const PlayerSeat = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const CardPlaceholder = styled.div<CardPLaceholderProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 90px;
  height: 131px;
  border: 3px solid rgba(255, 255, 255, 0.39);
  border-radius: 11px;

  ${({ dealSpeed, handsNumber, currentHand }: CardPLaceholderProps) => css`
    #card:first-of-type {
      animation: card-in ${dealSpeed}s ${dealDelay * currentHand}s backwards;
    }
    #card:nth-of-type(2) {
      animation: card-in ${dealSpeed}s ${dealDelay * currentHand + dealDelay * handsNumber}s backwards;
    }
    #card {
      animation: card-in ${dealSpeed}s backwards;
    }
  `};
  @keyframes card-in {
    0% {
      transform: translate(100vw, -100vh);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  @media (min-width: 1100px) {
    width: 110px;
    height: 161px;
    border-radius: 13px;
  }
`;

export const Highlight = styled.div`
  z-index: -1;
  position: absolute;
  width: 180px;
  height: 200px;
  background: radial-gradient(circle, #fff9 0%, #fff0 100%);
  border-radius: 50%;
  animation: HighlightPulse 4s linear infinite;
  @keyframes HighlightPulse {
    from {
      opacity: 1;
    }
    50% {
      opacity: 50%;
    }
    to {
      opacity: 1;
    }
  }
`;

export const HandCountBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
  @media (min-width: 1100px) {
    margin-bottom: 25px;
  }
`;
export const HandCount = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 20px;
  background-color: ${theme.colorStyles.Black};
  color: ${theme.colorStyles.White};
  border-radius: 15px;
`;

export const HandCountPointer = styled.div`
  position: absolute;
  transform: translateY(20px);
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 11px 9.5px 0 9.5px;
  border-color: ${theme.colorStyles.Orange1} transparent transparent transparent;
`;

export const AddPlayerButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  height: 50px;
  width: 50px;
  border-radius: 25px;

  background-color: ${theme.colorStyles.Gray2};
  border: none;

  :hover {
    cursor: pointer;
    opacity: 80%;
  }
  :active {
    background-color: ${theme.colorStyles.Gray3};
  }
`;

export const DeletePlayerButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  height: 20px;
  width: 40px;
  border-radius: 15px;

  margin-top: 15px;
  @media (min-width: 1100px) {
    margin-top: 25px;
  }

  background-color: ${theme.colorStyles.Red1};
  border: none;

  :hover {
    cursor: pointer;
    opacity: 80%;
  }
  :active {
    background-color: ${theme.colorStyles.Red2};
  }
`;
