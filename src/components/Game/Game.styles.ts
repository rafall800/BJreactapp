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
  margin-top: 60px;
  min-width: 700px;
  max-width: 1440px;
  height: 850px;
`;

export const GameTable = styled.div`
  position: absolute;
  z-index: -1;

  width: 110%;
  min-width: 700px;
  max-width: 1440px;
  height: 850px;
  top: 100px;

  background: radial-gradient(circle, rgba(31, 231, 51, 0.4) 0%, rgba(2, 3, 5, 1) 100%);
  border-radius: 49%;
  border: 20px solid #000000;
  box-shadow: inset 0px -10px 4px rgba(0, 0, 0, 0.85), inset 0px 10px 4px rgba(0, 0, 0, 0.85);
  filter: drop-shadow(0px 10px 4px rgba(0, 0, 0, 0.85));
`;
