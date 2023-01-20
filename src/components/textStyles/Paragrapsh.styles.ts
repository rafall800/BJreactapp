import { theme } from './../theme';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

interface ParagraphProps {
  bold?: boolean;
}

export const Paragraph = styled.p<ParagraphProps>`
  color: ${theme.colorStyles.Gray4};
  font-size: ${theme.fontSize.ParagraphMobile};
  font-weight: ${theme.fontWeight.SemiBold};
  ${({ bold }: ParagraphProps) => css`
    ${bold &&
    css`
      font-weight: ${theme.fontWeight.Bold};
      color: ${theme.colorStyles.Black};
    `};
  `};
  line-height: 24px;
  @media (min-width: 1100px) {
    font-size: ${theme.fontSize.Paragraph};
    line-height: 30px;
  }
`;
