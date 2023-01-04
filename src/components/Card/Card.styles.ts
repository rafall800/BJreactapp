import styled from '@emotion/styled';
import { theme } from '../theme';

export const StyledCard = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  border: 1px solid ${theme.colorStyles.Black};
  border-radius: 8px;
  @media (min-width: 1100px) {
    border-radius: 10px;
  }
`;
