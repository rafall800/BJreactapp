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
