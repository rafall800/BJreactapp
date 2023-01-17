import { theme } from '../theme';
import styled from '@emotion/styled';

export const StyledTools = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 860px;
  height: 600px;
  background-color: ${theme.colorStyles.Gray4};
  margin-top: 100px;
  h1 {
    color: ${theme.colorStyles.White};
    margin: 7px 0;
  }
  span {
    width: 100%;
    height: 1px;
    background-color: ${theme.colorStyles.Gray3};
  }
`;
