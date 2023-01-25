import styled from '@emotion/styled';
import { theme } from '../../../../components/theme';

export const StyledHud = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  flex: 1;
`;

export const Decisions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  @media (min-width: 1100px) {
    flex-direction: row;
  }
`;

export const DecisionOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 5px;
  margin: 20px 0;
  p {
    color: ${theme.colorStyles.Black};
  }
`;

export const FlexBox = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
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
