import { theme } from './../theme';
import styled from '@emotion/styled';

export const StyledAbout = styled.div`
  position: relative;
  cursor: pointer;
`;

export const Popup = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  position: absolute;
  z-index: 4;
  width: 200px;
  top: 50px;
  background-color: ${theme.colorStyles.White};
  border-radius: 25px;
  @media (min-width: 1100px) {
    width: 300px;
  }
`;
