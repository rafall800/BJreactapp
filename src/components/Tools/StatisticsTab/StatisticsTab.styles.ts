import { theme } from './../../theme';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface LegendProps {
  color: string;
}

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

export const ChartsBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  gap: 20px;
  margin: 20px 0 10px 0;
  min-height: 250px;
`;

export const Chart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
  img {
    width: 100%;
    cursor: pointer;
  }
`;

export const Legend = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 10px;
`;

export const ChartLegend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const LegendElement = styled.div`
  display: flex;
  gap: 10px;
`;

export const ColoredSquare = styled.div<LegendProps>`
  height: 16px;
  width: 16px;
  border: 1px solid ${theme.colorStyles.Black};
  ${({ color }: LegendProps) => css`
    background-color: ${color};
  `};
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
