import styled from '@emotion/styled';
import { theme } from '../theme';

export const ArticleBox = styled.article`
  width: 100%;
  max-width: ${theme.contentMaxWidth};
  display: flex;
  flex-direction: column;
  gap: 50px;
  padding: 20px 50px;
  h3 {
    color: ${theme.colorStyles.Black};
  }
  @media (min-width: 1100px) {
    padding: 50px 150px;
  }
`;
