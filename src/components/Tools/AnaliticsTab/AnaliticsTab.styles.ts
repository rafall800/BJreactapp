import styled from '@emotion/styled';
import { theme } from '../../theme';

export const StyledAnaliticsTab = styled.div`
  flex: 1;
  margin: 20px 0;
`;

export const StyledOuterTable = styled.table`
  width: 100%;
  thead {
    color: ${theme.colorStyles.White};
    background-color: ${theme.colorStyles.Gray6};
    height: 30px;
  }
`;
