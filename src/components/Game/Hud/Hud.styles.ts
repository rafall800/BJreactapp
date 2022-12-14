import styled from '@emotion/styled';
import { theme } from '../../theme';

export const StyledHud = styled.div`
  display: flex;
  align-items: flex-end;
  height: 100%;
`;

export const DecisionOptions = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 200px;
  margin-bottom: 40px;
`;

export const BetOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  margin-bottom: 20px;

  background-color: ${theme.colorStyles.Green1};
  border-radius: 20px;
  p {
    color: ${theme.colorStyles.Black};
  }
`;

export const Stakes = styled.div`
  display: flex;
  align-items: center;
  button {
    padding: 0 5px;
    border-left: 2px solid ${theme.colorStyles.Black};
  }
`;
export const YourBet = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
export const YourBalance = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;
