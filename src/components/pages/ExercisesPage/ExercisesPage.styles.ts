import { theme } from './../../theme';
import styled from '@emotion/styled';

export const StyledExercisesPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
`;

export const ExercisesBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  max-width: ${theme.contentMaxWidth};
  width: 100%;

  padding: 0 20px 0 20px;
  margin: 140px 0;
`;

export const Exercise = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: ${theme.colorStyles.Green2};
  border-radius: 25px;
  overflow: hidden;
  h1 {
    color: ${theme.colorStyles.White};
  }
  img {
    width: 100%;
    :hover {
      opacity: 0.25;
    }
    cursor: pointer;
  }
`;