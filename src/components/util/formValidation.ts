//git
export type FormValidation<T> = {
  [Property in keyof T]: { isValid: (value: T[Property]) => boolean; message: string }[];
};

//zamiast any => FormValidation<Typy wszystkich inputów w programie>
const VALIDATION: FormValidation<any> = {
  balance: [
    {
      isValid: (value: number) => !!value,
      message: 'Is required.'
    },
    {
      isValid: (value: number) => value >= 1000,
      message: 'Needs to be greater than 1000.'
    }
  ]
};
