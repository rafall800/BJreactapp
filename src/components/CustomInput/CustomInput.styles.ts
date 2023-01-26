import { css } from '@emotion/react';
import styled from '@emotion/styled';

import { theme } from '../theme';

interface StyledCustomInputProps {
  isError: boolean;
  spinOn: boolean;
}

export const StyledCustomInput = styled('div')<StyledCustomInputProps>`
  position: relative;
  margin: 5px;

  font-weight: ${theme.fontWeight.Regular};

  input {
    position: relative;
    margin: 28px 0 10px 0;
    padding: 10px 0 10px 18px;

    outline: none;
    border: solid 2px transparent;
    background-color: ${theme.colorStyles.Gray1};
    border-radius: 8px;

    color: ${theme.colorStyles.Gray5};
    font-size: ${theme.fontSize.CustomInput};

    ::placeholder {
      display: none;
      opacity: 0;
      visibility: hidden;
    }
  }

  label {
    position: absolute;
    left: 18px;
    top: 40px;

    transition: all 0.3s ease;
    pointer-events: none;

    color: ${theme.colorStyles.Gray3};
    font-size: ${theme.fontSize.CustomInput};
  }

  span {
    display: none;
    color: ${theme.colorStyles.Red3};
  }

  ${({ isError }: StyledCustomInputProps) => css`
    ${isError &&
    css`
      input ~ span {
        display: block;
      }
      input + label {
        color: ${theme.colorStyles.Red3};
      }
      input:focus + label {
        color: ${theme.colorStyles.Red3};
      }
    `}
  `};

  input:focus {
    border: solid 2px ${theme.colorStyles.Green5};
  }

  input:focus + label,
  input:not(:placeholder-shown) + label {
    top: 3px;
    left: 18px;
    font-size: ${theme.fontSize.CustomInputLabel};
  }

  input:focus + label {
    color: ${theme.colorStyles.Green5};
  }

  ${({ spinOn }: StyledCustomInputProps) => css`
    ${!spinOn &&
    css`
      input::-webkit-outer-spin-button,
      input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      input[type='number'] {
        -moz-appearance: textfield;
      }
    `}
  `};
`;
