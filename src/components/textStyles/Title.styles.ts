import { theme } from './../theme';
import styled from '@emotion/styled';

export const Title = styled.h3`
  color: ${theme.colorStyles.Black};
  font-size: ${theme.fontSize.TitleMobile};
  font-weight: ${theme.fontWeight.Black};
  @media (min-width: 964px) {
    font-size: ${theme.fontSize.Title};
  }
`;
