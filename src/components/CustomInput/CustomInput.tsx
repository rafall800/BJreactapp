import { FC } from 'react';

import { StyledCustomInput } from './CustomInput.styles';

interface CustomInputProps {
  label: string;
  type?: React.HTMLInputTypeAttribute;
  value?: string | number | readonly string[] | undefined;
  errorMessage?: string[];
  id?: string;
  spinOn?: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const CustomInput: FC<CustomInputProps> = ({ id, label, type, value, errorMessage, spinOn, onChange }) => {
  return (
    <StyledCustomInput isError={errorMessage ? true : false} spinOn={spinOn ? true : false}>
      <input id={id} placeholder={label} type={type} value={value} onChange={onChange} required />
      <label>{label}</label>
      {errorMessage?.map((message) => {
        return <span key={message}>{message}</span>;
      })}
    </StyledCustomInput>
  );
};

export default CustomInput;
