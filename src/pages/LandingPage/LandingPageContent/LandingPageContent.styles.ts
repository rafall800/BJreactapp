import styled from '@emotion/styled';
import { theme } from '../../../components/theme';

export const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: ${theme.contentMaxWidth};
  width: 100%;

  padding: 0 20px 0 20px;
  margin: 140px 0;
  gap: 50px;
`;

export const TextBlock1 = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 350px;
  @media (min-width: 1100px) {
    max-width: 858px;
    align-self: flex-end;
  }
`;

export const TextBlock2 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  @media (min-width: 1100px) {
    max-width: 592px;
    align-self: flex-start;
  }
`;

export const ListElement = styled.li`
  list-style-type: disc;
  color: ${theme.colorStyles.Gray4};
  margin: 5px 0 0 15px;
`;

export const PreviewBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
  @media (min-width: 1100px) {
    gap: none;
    min-width: 1080px;
    #reverse {
      flex-direction: row-reverse;
    }
  }
`;

export const PreviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
  img {
    max-width: 260px;
    max-height: 260px;
    border-radius: 50px;
  }
  @media (min-width: 1100px) {
    flex-direction: row;
    justify-content: space-between;
    img {
      max-width: 400px;
      max-height: 400px;
    }
  }
`;
