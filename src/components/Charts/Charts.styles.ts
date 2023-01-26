import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { theme } from '../theme';

interface LegendProps {
  color: string;
}

interface SwitchChartsButtonProps {
  chartType: 'BS' | 'Deviations';
}

export const ChartsBox = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 130px);
  grid-template-rows: repeat(2, 130px);
  gap: 10px;
  align-items: center;
  justify-content: center;
  @media (min-width: 1100px) {
    display: flex;
    flex: 1;
    gap: 20px;
    margin: 20px 0 10px 0;
  }
`;

export const Chart = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  width: 100%;
  height: 100%;
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
  }
`;

export const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 10px;
  @media (min-width: 1100px) {
    flex-direction: row;
    gap: 20px;
  }
`;

export const ChartLegend = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  @media (min-width: 1100px) {
    flex-direction: column;
  }
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

export const SwitchChartsButton = styled.div<SwitchChartsButtonProps>`
  button {
    padding: 5px;
    height: 100%;
    border-radius: 20px;
    border: 1px solid ${theme.colorStyles.Black};
    :hover {
      background-color: ${theme.colorStyles.Blue1};
    }
  }
  ${({ chartType }: SwitchChartsButtonProps) => css`
    ${chartType === 'Deviations' &&
    css`
      background-color: ${theme.colorStyles.Blue2};
    `};
  `};
`;
