import styled from '@emotion/styled';
import { theme } from '../../theme';

export const StyledHamburger = styled.button`
  display: flex;
  flex-direction: column;
  gap: 3px;

  width: 30px;
  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;
  span {
    width: 100%;
    height: 7px;
    background-color: ${theme.colorStyles.Black};
    border: 1px solid ${theme.colorStyles.Gray2};
    border-radius: 25px;
  }
  :hover {
    cursor: pointer;
  }
  :hover,
  :active {
    span {
      background-color: ${theme.colorStyles.Green4};
      border: 1px solid ${theme.colorStyles.Black};
    }
  }
  :focus-visible {
    outline: none;
  }
`;
