import styled from '@emotion/styled';
import { theme } from '../../../../components/theme';

export const ButtonBox = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px;
`;

export const CheckboxBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 5px;
  label {
    color: ${theme.colorStyles.Gray3};
    font-size: ${theme.fontSize.CustomInput};
  }
  input {
    min-height: 18px;
    min-width: 18px;
    margin: 0;
  }
`;
