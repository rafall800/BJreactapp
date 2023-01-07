import styled from '@emotion/styled';
import { theme } from '../theme';

export const StyledGameSettings = styled.div`
  height: 100px;
  background-color: ${theme.colorStyles.Gray1};
  margin: 50px 0;
`;

export const Speeds = styled.div`
  display: flex;
  align-items: center;
  button {
    padding: 0 5px;
    border-left: 2px solid ${theme.colorStyles.Black};
    :hover {
      background-color: ${theme.colorStyles.Gray2};
    }
  }
`;
