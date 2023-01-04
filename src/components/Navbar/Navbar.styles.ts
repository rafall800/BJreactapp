import { theme } from '../theme';
import styled from '@emotion/styled';

export const StyledNavbar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 80px;

  border-bottom: 0.5px solid ${theme.colorStyles.White};
`;

export const Content = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;

  width: 100%;
  max-width: ${theme.contentMaxWidth};
  padding: 0 22px;

  svg {
    justify-self: center;
    cursor: pointer;
  }
  #singin-navbar {
    display: none;
    justify-self: end;
  }
  @media (min-width: 1100px) {
    padding: 0 70px;
    #singin-navbar {
      display: inline;
    }
  }
`;

export const Collapsible = styled.div`
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  flex-direction: column;

  height: 0px;
  padding: 0 15px;
  margin-right: 20px;
  overflow: hidden;

  border-bottom-right-radius: 40px;
  transition: height ease 0.3s;
  background-color: ${theme.colorStyles.Green1};
  #singin-collapsible {
    margin: 50px 0;
  }
  @media (min-width: 1100px) {
    max-width: 33%;
  }
`;

export const Tabs = styled.div`
  margin-top: 100px;
  width: 100%;
  button {
    border-bottom: 1px solid ${theme.colorStyles.Black};
  }
`;
