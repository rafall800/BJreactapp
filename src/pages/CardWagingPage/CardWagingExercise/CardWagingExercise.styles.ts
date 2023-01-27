import styled from '@emotion/styled';

export const StyledCardCountingExercise = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 100px;
  max-width: 1440px;
  min-height: 850px;
`;

export const SingleCardPlaceholder = styled.div`
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

export const ButtonBox = styled.div`
  display: flex;
  gap: 20px;
`;

export const AlertGrid = styled.div`
  display: grid;
  grid-column-gap: 10px;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
`;

export const FillDiv = styled.div`
  width: 50px;
`;
