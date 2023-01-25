import { theme } from '../../../../components/theme';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface ButtonWrapperProps {
  isActive: boolean;
}

export const StyledStatisticsTab = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px 20px;
  table {
    border: 1px solid ${theme.colorStyles.Gray2};
  }
  thead {
    height: 40px;
    background-color: ${theme.colorStyles.Gray6};
  }
  tbody {
    tr {
      height: 40px;
      background-color: ${theme.colorStyles.Gray3};
    }
  }
  th {
    vertical-align: middle;
    color: ${theme.colorStyles.White};
    font-size: ${theme.fontSize.TabMobile};
    font-weight: ${theme.fontWeight.Bold};
    @media (min-width: 1100px) {
      font-size: ${theme.fontSize.Tab};
    }
  }
`;

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
  align-self: flex-end;
  margin: 20px 0;
  button {
    padding: 5px;
    height: 100%;
    border-radius: 20px;
    ${({ isActive }: ButtonWrapperProps) => css`
      ${isActive &&
      css`
        background-color: ${theme.colorStyles.Blue1};
        :hover {
          background-color: ${theme.colorStyles.Blue2};
        }
      `};
    `};
    :hover {
      opacity: 0.75;
    }
  }
`;
