import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../../theme';

interface ArticleTabProps {
  active: boolean;
}

export const StyledArticlesPagegPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
`;

export const ArticlesNavigation = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
  max-width: ${theme.contentMaxWidth};
  border-bottom: 2px solid ${theme.colorStyles.Green2};
`;

export const ArticleTab = styled.li`
  padding: 20px;
  h2 {
    color: ${theme.colorStyles.Black};
  }
  ${({ active }: ArticleTabProps) => css`
    ${active &&
    css`
      border-width: 2px 2px 0 2px;
      border-style: solid;
      border-color: ${theme.colorStyles.Green2};
    `};
  `};
  :hover {
    cursor: pointer;
    background-color: ${theme.colorStyles.Green2};
  }
`;
