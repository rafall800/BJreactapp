import styled from '@emotion/styled';

export const StyledGame = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const GameTableContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1440px;
  min-height: 850px;
`;

export const RelativeBox = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  margin-top: 20px;
  width: 100%;
  @media (min-width: 1100px) {
    position: unset;
    width: unset;
    height: unset;
  }
`;

export const GameTable = styled.div`
  position: absolute;
  z-index: -2;

  width: 110%;
  min-width: 700px;
  max-width: 1440px;
  height: 850px;
  margin-top: 20px;

  background: radial-gradient(circle, rgba(31, 231, 51, 0.4) 0%, rgba(2, 3, 5, 1) 100%);
  border-radius: 49%;
  border: 20px solid #000000;
  box-shadow: inset 0px -10px 4px rgba(0, 0, 0, 0.85), inset 0px 10px 4px rgba(0, 0, 0, 0.85);
  filter: drop-shadow(0px 10px 4px rgba(0, 0, 0, 0.85));
`;
