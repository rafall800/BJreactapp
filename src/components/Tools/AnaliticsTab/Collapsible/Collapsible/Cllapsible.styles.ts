import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../../../../theme';

interface CollapsibleProps {
  isNested?: boolean;
}

export const StyledCollapsible = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${theme.colorStyles.Gray3};

  :hover {
    margin: 0 -4px;
    transition: margin ease 0.1s;
  }
`;

export const CollapsibleHeader = styled.div<CollapsibleProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  height: 35px;
  margin: 0;
  ${({ isNested }: CollapsibleProps) => css`
    ${isNested &&
    css`
      border-top: 1px solid ${theme.colorStyles.Gray2};
    `};
  `};
  cursor: pointer;
  :hover {
    background-color: ${theme.colorStyles.Gray2};
  }
`;

export const CollapsibleContent = styled.div<CollapsibleProps>`
  display: flex;
  flex-direction: column;
  ${({ isNested }: CollapsibleProps) => css`
    ${!isNested &&
    css`
      padding: 0 20px;
    `};
    ${isNested &&
    css`
      overflow: scroll;
    `};
  `};
`;

export const InnerCollapsibleHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  height: 35px;
  margin: 0;
  cursor: pointer;
  :hover {
    background-color: ${theme.colorStyles.Gray2};
  }
`;

export const InnerCollapsibleContent = styled.div`
  display: flex;
  flex-direction: column;
`;

export const CollapsibleTitle = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
`;

export const DealOutcome = styled.div`
  display: flex;
  gap: 10px;
  margin-right: 5px;
  align-items: center;
  color: ${theme.colorStyles.White};
`;
