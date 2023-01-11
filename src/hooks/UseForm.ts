import { useState } from 'react';

type Validations<T extends {}> = Partial<Record<keyof T, Validation<T[keyof T]>[]>>;

interface Validation<T> {
  isValid: (value: T) => boolean;
  message: string;
}

type ErrorRecord<T> = Partial<Record<keyof T, string[]>>;

export const useForm = <T extends Record<keyof T, any> = {}>(options?: {
  validations?: Validations<T>;
  initialValues?: Partial<T>;
  onSubmit?: () => void;
}) => {
  const [form, setForm] = useState<T>((options?.initialValues || {}) as T);
  const [errors, setErrors] = useState<ErrorRecord<T>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let inputValue: string | boolean = event.target.value;
    if (event.target.type === 'checkbox') inputValue = event.target.checked;
    setForm({
      ...form,
      [event.target.id]: inputValue
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = false;
      const newErrors: ErrorRecord<T> = {};
      for (const key in validations) {
        const value = form[key];
        const formField = validations[key];

        formField?.forEach((validation) => {
          if (!validation.isValid(value)) {
            Object.hasOwn(newErrors, key)
              ? newErrors[key]?.push(validation.message)
              : (newErrors[key] = [validation.message]);
          }
        });
      }

      if (Object.keys(newErrors).length === 0) {
        valid = true;
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});

    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  return {
    form,
    handleChange,
    handleSubmit,
    errors
  };
};
