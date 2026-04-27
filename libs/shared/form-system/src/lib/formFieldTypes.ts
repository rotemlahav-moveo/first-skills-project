import type { FieldValues, Path } from 'react-hook-form';
import type { ReactNode } from 'react';

export enum FormFieldKind {
  input = 'input',
  select = 'select',
  checkboxGroup = 'checkbox-group',
}

export enum InputType {
  text = 'text',
  email = 'email',
  password = 'password',
  search = 'search',
  url = 'url',
  tel = 'tel',
}

// FormSelectOption is used to configure the options for a select/checkbox-group field.
export type FormSelectOption = {
  value: string;
  label: string;
};

// every field type has a name, label, description, containerClassName, labelClassName, and disabled.
type BaseFormFieldConfig<TValues extends FieldValues> = {
  name: Path<TValues>;
  label: ReactNode;
  description?: ReactNode;
  containerClassName?: string;
  labelClassName?: string;
  disabled?: boolean;
};

// InputFieldConfig is used to configure the input field.
export type InputFieldConfig<TValues extends FieldValues> = BaseFormFieldConfig<TValues> & {
  kind: FormFieldKind.input;
  inputType?: InputType;
  placeholder?: string;
  autoComplete?: string;
};

// SelectFieldConfig is used to configure the select field (dropdown)
export type SelectFieldConfig<TValues extends FieldValues> = BaseFormFieldConfig<TValues> & {
  kind: FormFieldKind.select;
  options: FormSelectOption[];
};

// CheckboxGroupFieldConfig is used to configure the checkbox group field.
export type CheckboxGroupFieldConfig<TValues extends FieldValues> = BaseFormFieldConfig<TValues> & {
  kind: FormFieldKind.checkboxGroup;
  options: FormSelectOption[];
};
// FormFieldConfig is one of the three field types: input, select, or checkbox-group.
export type FormFieldConfig<TValues extends FieldValues> =
  | InputFieldConfig<TValues>
  | SelectFieldConfig<TValues>
  | CheckboxGroupFieldConfig<TValues>;
