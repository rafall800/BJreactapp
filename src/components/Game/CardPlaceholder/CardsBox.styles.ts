import styled from '@emotion/styled';
import { theme } from '../../theme';

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 150px;
`;

export const CardPlaceholder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 73px;
  height: 87px;
  border: 3px solid rgba(255, 255, 255, 0.39);
  border-radius: 10px;

  text-align: center;
  white-space: nowrap;
  h1 {
    margin-top: 20px;
  }
  @media (min-width: 1050px) {
    width: 78px;
    height: 106px;
  }
`;

export const CardPlaceholderBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  gap: 40px;
  #card2 {
    transform: rotate(30deg);
  }
  #card3 {
    margin-top: 30px;
  }
  #card4 {
    transform: rotate(-30deg);
  }
  #card1,
  #card5 {
    display: none;
  }
  @media (min-width: 1050px) {
    gap: 180px;
    #card1 {
      display: flex;
      transform: rotate(42deg) translateY(-150px);
    }
    #card2 {
      transform: rotate(24deg) translateY(-15px);
    }
    #card4 {
      transform: rotate(-24deg) translateY(-15px);
    }
    #card5 {
      display: flex;
      transform: rotate(-42deg) translateY(-150px);
    }
  }
  @media (min-width: 1350px) {
    gap: 180px;
    #card1 {
      transform: rotate(30deg) translateY(-80px);
    }
    #card2 {
      transform: rotate(14deg);
    }
    #card4 {
      transform: rotate(-14deg);
    }
    #card5 {
      transform: rotate(-30deg) translateY(-80px);
    }
  }
`;

export const HandCountBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-75px);
  @media (min-width: 1050px) {
    transform: translateY(-100px);
  }
`;
export const HandCount = styled.div`
  display: none;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 22px;
  background-color: ${theme.colorStyles.Black};
  color: ${theme.colorStyles.White};
  border-radius: 15px;
`;

export const HandCountPointer = styled.div`
  display: none;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 11px 9.5px 0 9.5px;
  border-color: ${theme.colorStyles.Orange1} transparent transparent transparent;
`;
