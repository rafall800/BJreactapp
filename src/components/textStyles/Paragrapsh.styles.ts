import { theme } from './../theme';
import styled from '@emotion/styled';

export const Paragraph = styled.p`
  color: ${theme.colorStyles.Gray4};
  font-size: ${theme.fontSize.ParagraphMobile};
  font-weight: ${theme.fontWeight.SemiBold};
  @media (min-width: 1100px) {
    font-size: ${theme.fontSize.Paragraph};
  }
`;
