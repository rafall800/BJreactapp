import styled from '@emotion/styled';
import { theme } from '../../theme';

export const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 100px;
`;

export const CardPlaceholder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 73px;
  height: 107px;
  border: 3px solid rgba(255, 255, 255, 0.39);
  border-radius: 10px;

  text-align: center;
  white-space: nowrap;
  h1 {
    margin-top: 20px;
  }
  @media (min-width: 1050px) {
    width: 88px;
    height: 128px;
  }
`;

export const CardPlaceholderBox = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  gap: 30vw;
  #card1,
  #card2,
  #card5 {
    display: none;
  }
  @media (min-width: 650px) {
    gap: 20vw;
    #card2 {
      display: flex;
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
  }
  @media (min-width: 1150px) {
    gap: 200px;
    #card1 {
      display: flex;
      transform: rotate(42deg) translateY(-150px);
    }
    #card2 {
      display: flex;
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
    gap: 220px;
    #card1 {
      transform: rotate(26deg) translateY(-100px);
    }
    #card2 {
      display: flex;
      transform: rotate(14deg);
    }
    #card4 {
      transform: rotate(-14deg);
    }
    #card5 {
      transform: rotate(-26deg) translateY(-100px);
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
  display: flex;
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

export const AddPlayerButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;

  padding: 10px;
  height: 50px;
  width: 50px;
  border-radius: 25px;

  background-color: ${theme.colorStyles.Gray1};
  border: none;

  :hover {
    cursor: pointer;
    opacity: 80%;
  }
`;
