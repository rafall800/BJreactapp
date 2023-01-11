import { FC } from 'react';

import { StyledCustomInput } from './CustomInput.styles';

interface CustomInputProps {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number | readonly string[] | undefined;
  errorMessage?: string[];
  id?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const CustomInput: FC<CustomInputProps> = ({ id, label, type, value, errorMessage, onChange }) => {
  return (
    <StyledCustomInput isError={errorMessage ? true : false}>
      <input id={id} placeholder={label} type={type} value={value} onChange={onChange} required />
      <label>{label}</label>
      {errorMessage?.map((message) => {
        return <span key={message}>{message}</span>;
      })}
    </StyledCustomInput>
  );
};

export default CustomInput;
