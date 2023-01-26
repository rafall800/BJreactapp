import styled from '@emotion/styled';
import { theme } from '../../components/theme';

export const StyledExercisesPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

export const ExercisesBox = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 50px;
  max-width: ${theme.contentMaxWidth};
  width: 100%;

  padding: 0 20px 0 20px;
  margin: 50px 0;
  @media screen {
  }
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
