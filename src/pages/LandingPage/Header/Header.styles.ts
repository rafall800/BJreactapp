import styled from '@emotion/styled';
import { theme } from '../../../components/theme';

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
  h1 {
    color: ${theme.colorStyles.White};
    text-shadow: ${theme.textOutlines.Strong}, 0px 8px 4px rgba(0, 0, 0, 0.4);
  }
  h2 {
    margin: 10px 0 15px 0;
    color: ${theme.colorStyles.White};
    text-shadow: ${theme.textOutlines.Light}, 0px 4px 4px rgba(0, 0, 0, 0.4);
  }
`;

export const Background = styled.div`
  position: absolute;
  z-index: -1;

  width: 110%;
  min-width: 700px;
  max-width: 1440px;
  height: 847px;
  top: -260px;
  background: radial-gradient(circle, rgba(31, 231, 51, 0.4) 0%, rgba(2, 3, 5, 1) 100%);
  border-radius: 49%;
  border: 20px solid #000000;
  box-shadow: inset 0px -10px 4px rgba(0, 0, 0, 0.85);
  filter: drop-shadow(0px 10px 4px rgba(0, 0, 0, 0.85));
`;

export const CardBorder = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 90px;
  height: 131px;
  border: 3px solid rgba(255, 255, 255, 0.39);
  border-radius: 11px;

  white-space: nowrap;
  h1 {
    margin-top: 20px;
  }
  @media (min-width: 1100px) {
    width: 110px;
    height: 161px;
    border-radius: 13px;
  }
`;

export const CardBorderBox = styled.div`
  display: flex;
  gap: 12vw;
  margin-top: 20px;
  @media (min-width: 1100px) {
    gap: 80px;
  }
`;
