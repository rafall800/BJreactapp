import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../../../../components/theme';

interface CardPlaceholderProps {
  dealSpeed: number;
  handsNumber: number;
  currentHand: number;
}

interface SplitCardPlaceholderProps {
  dealSpeed: number;
}

interface StackedCardsProps {
  container: 'shoe' | 'dealtCards';
  cardsAmount: number;
}

interface OutcomeProps {
  outcome: 'win' | 'lose' | 'push' | 'surrender';
}

interface HighlightProps {
  handType: 'default' | 'splitHand';
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
  grid-template-columns: 1fr auto 1fr;
  column-gap: 10px;
  align-items: center;
  justify-items: center;

  width: 100%;
`;

export const DealtCards = styled.div`
  display: flex;
  align-items: flex-end;
  position: relative;
  height: 120px;
  width: 80px;
  margin-top: 35px;
  border-width: 0 0 3px 3px;
  border-style: solid;
  border-color: ${theme.colorStyles.Black};
  @media (min-width: 1100px) {
    height: 140px;
    width: 100px;
    margin-top: 45px;
  }
`;

export const CutCard = styled.div`
  position: absolute;
  right: -70px;
  width: 50px;
  height: 70px;
  background-color: ${theme.colorStyles.Yellow1};
  border-radius: 7px;
`;

export const Shoe = styled.div`
  display: flex;
  justify-content: flex-end;
  height: 40px;
  width: 120px;
  margin-top: 35px;
  border-width: 0 3px 3px 0;
  border-style: solid;
  border-color: ${theme.colorStyles.Black};
  @media (min-width: 1100px) {
    height: 50px;
    width: 240px;
    margin-top: 45px;
  }
`;

export const StackedCards = styled.div<StackedCardsProps>`
  ${({ container, cardsAmount }: StackedCardsProps) => css`
    ${container === 'shoe' &&
    css`
      height: 100%;
      width: ${cardsAmount * 120}px;
      @media (min-width: 1100px) {
        width: ${cardsAmount * 240}px;
      }
      background: linear-gradient(
        90deg,
        ${theme.colorStyles.Gray2} 0%,
        ${theme.colorStyles.Gray3} 50%,
        ${theme.colorStyles.Gray4} 100%
      );
    `};
    ${container === 'dealtCards' &&
    css`
      width: 100%;
      height: ${cardsAmount * 120}px;
      @media (min-width: 1100px) {
        height: ${cardsAmount * 140}px;
      }
      background: linear-gradient(
        180deg,
        ${theme.colorStyles.Gray2} 0%,
        ${theme.colorStyles.Gray3} 50%,
        ${theme.colorStyles.Gray4} 100%
      );
    `};
  `};
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

export const CardPlaceholder = styled.div<CardPlaceholderProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 90px;
  height: 131px;
  border: 3px solid rgba(255, 255, 255, 0.39);
  border-radius: 11px;

  ${({ dealSpeed, handsNumber, currentHand }: CardPlaceholderProps) => css`
    #card:first-of-type {
      animation: card-in ${dealSpeed}s ${dealDelay * currentHand}s backwards;
    }
    #card:nth-of-type(2) {
      animation: card-in ${dealSpeed}s ${dealDelay * currentHand + dealDelay * handsNumber}s backwards;
    }
    #card:nth-of-type(n + 2) ~ #card {
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

export const SplitHandsBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  gap: 20px;
`;

export const SplitCardPlaceholderBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SplitCardPlaceholder = styled.div<SplitCardPlaceholderProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 90px;
  height: 31px;
  border: 3px solid rgba(255, 255, 255, 0.39);
  border-radius: 11px;

  img {
    object-position: 0 0;
  }

  ${({ dealSpeed }: SplitCardPlaceholderProps) => css`
    #card:first-of-type {
      animation: first-card-in ${dealSpeed}s ${dealDelay}s backwards;
    }
    #card:nth-of-type(n + 1) ~ #card {
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
  @keyframes first-card-in {
    0% {
      transform: translateY(-150px);
    }
    100% {
      transform: translate(0, 0);
    }
  }

  @media (min-width: 1100px) {
    width: 110px;
    height: 61px;
    border-radius: 13px;
  }
`;

export const Highlight = styled.div<HighlightProps>`
  z-index: -1;
  position: absolute;
  width: 180px;
  background: radial-gradient(circle, #fff9 30%, #fff0 100%);
  border-radius: 50%;
  animation: HighlightPulse 2s linear infinite;
  ${({ handType }: HighlightProps) => css`
    ${handType === 'default' &&
    css`
      height: 200px;
    `};
    ${handType === 'splitHand' &&
    css`
      height: 100px;
    `};
  `};
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

export const Outcome = styled.div<OutcomeProps>`
  z-index: -1;
  position: absolute;
  width: 180px;
  height: 200px;
  border-radius: 50%;
  ${({ outcome }: OutcomeProps) => css`
    ${outcome === 'win' &&
    css`
      background: radial-gradient(circle, ${theme.colorStyles.Green3} 0%, ${theme.colorStyles.Green3} 100%);
    `};
    ${outcome === 'lose' &&
    css`
      background: radial-gradient(circle, ${theme.colorStyles.Red2} 0%, ${theme.colorStyles.Red2} 100%);
    `};
    ${outcome === 'push' &&
    css`
      background: radial-gradient(circle, ${theme.colorStyles.Orange1} 0%, ${theme.colorStyles.Orange1} 100%);
    `};
    ${outcome === 'surrender' &&
    css`
      background: radial-gradient(circle, ${theme.colorStyles.Gray3} 0%, ${theme.colorStyles.Gray3} 100%);
    `};
  `};
`;

export const HandBet = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 20px;
  margin-bottom: 5px;
  background-color: ${theme.colorStyles.Green5};
  border: 1px solid ${theme.colorStyles.Black};
  color: ${theme.colorStyles.White};
  border-radius: 15px;
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

  background-color: ${theme.colorStyles.Gray3};
  border: none;

  :hover {
    cursor: pointer;
    opacity: 80%;
  }
  :active {
    background-color: ${theme.colorStyles.Gray4};
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

  background-color: ${theme.colorStyles.Red3};
  border: none;

  :hover {
    cursor: pointer;
    opacity: 80%;
  }
  :active {
    background-color: ${theme.colorStyles.Red4};
  }
`;
