import styled from '@emotion/styled';
import { theme } from '../../../../components/theme';

export const StyledAnaliticsTab = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  margin: 40px 20px;
  padding: 20px;
  background-color: ${theme.colorStyles.Gray6};
  border-radius: 15px;
  gap: 2px;
  overflow: scroll;
`;
