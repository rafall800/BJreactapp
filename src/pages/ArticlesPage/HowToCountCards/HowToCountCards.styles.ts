import styled from '@emotion/styled';

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 70px;
  margin-left: 0;
`;

export const CardsBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  width: 90px;
  height: 131px;
  border: 3px solid rgba(255, 255, 255, 0.39);
  border-radius: 11px;
  @media (min-width: 1100px) {
    width: 110px;
    height: 161px;
    border-radius: 13px;
  }
`;

export const Flex = styled.div`
  display: flex;
  flex-direction: column;
`;
