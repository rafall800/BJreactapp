import { theme } from './../../../theme';
import styled from '@emotion/styled';

export const FlexBox = styled.article`
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

export const TextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  h3 ~ p,
  ul {
    margin-left: 50px;
  }
  p ~ ul {
    margin-left: 80px;
  }
  p + div {
    margin-left: 50px;
  }
`;

export const ParagraphsRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: 15px 0;
`;
