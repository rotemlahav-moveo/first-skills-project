import type { ReactNode } from 'react';
import { Controller, type Control, type FieldValues } from 'react-hook-form';

import { FormFieldKind, InputType, type FormFieldConfig } from './formFieldTypes';

type GenericFormInputProps<TValues extends FieldValues> = {
  control: Control<TValues>;
  fields: FormFieldConfig<TValues>[];
  isSubmitting?: boolean;
};

function ErrorMessage({ children }: { children?: ReactNode }) {
  if (!children) {
    return null;
  }

  return <p className="text-sm text-red-700">{children}</p>;
}

export function GenericFormInput<TValues extends FieldValues>({
  control,
  fields,
  isSubmitting = false,
}: GenericFormInputProps<TValues>) {
  return (
    <>
      {fields.map((field) => (
        <Controller
          key={`${field.kind}-${field.name}`}
          control={control}
          name={field.name}
          render={({ field: controllerField, fieldState }) => {
            const isDisabled = isSubmitting || field.disabled;
            const hasError = Boolean(fieldState.error?.message);

            switch (field.kind) {
              case FormFieldKind.input:
                return (
                  <div className={field.containerClassName ?? 'grid gap-2'}>
                    <label className={field.labelClassName ?? 'text-sm text-gray-700'} htmlFor={field.name}>
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={controllerField.name}
                      ref={controllerField.ref}
                      value={(controllerField.value as string) ?? ''}
                      onBlur={controllerField.onBlur}
                      onChange={controllerField.onChange}
                      disabled={isDisabled}
                      type={field.inputType ?? InputType.text}
                      autoComplete={field.autoComplete}
                      placeholder={field.placeholder}
                      aria-invalid={hasError}
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 shadow-xs transition-[color,box-shadow] outline-none placeholder:text-gray-500 focus-visible:border-gray-500 focus-visible:ring-[3px] focus-visible:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    />
                    {field.description ? <p className="text-sm text-gray-600">{field.description}</p> : null}
                    <ErrorMessage>{fieldState.error?.message}</ErrorMessage>
                  </div>
                );
              case FormFieldKind.select:
                return (
                  <div className={field.containerClassName ?? 'grid gap-2'}>
                    <label className={field.labelClassName ?? 'text-sm text-gray-700'} htmlFor={field.name}>
                      {field.label}
                    </label>
                    <select
                      id={field.name}
                      name={controllerField.name}
                      ref={controllerField.ref}
                      value={(controllerField.value as string) ?? ''}
                      onBlur={controllerField.onBlur}
                      onChange={controllerField.onChange}
                      disabled={isDisabled}
                      aria-invalid={hasError}
                      className="h-10 w-full rounded-md border border-gray-300 bg-white px-4 text-gray-900 outline-none focus-visible:border-gray-500 focus-visible:ring-[3px] focus-visible:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    {field.description ? <p className="text-sm text-gray-600">{field.description}</p> : null}
                    <ErrorMessage>{fieldState.error?.message}</ErrorMessage>
                  </div>
                );
              case FormFieldKind.checkboxGroup: {
                const selectedValues = new Set((controllerField.value as string[] | undefined) ?? []);
                return (
                  <div className={field.containerClassName ?? 'grid gap-3'}>
                    {field.label ? (
                      <span className={field.labelClassName ?? 'text-sm text-gray-900'}>{field.label}</span>
                    ) : null}
                    <div className="space-y-3">
                      {field.options.map((option) => (
                        <label key={option.value} className="flex cursor-pointer items-center gap-3">
                          <input
                            type="checkbox"
                            disabled={isDisabled}
                            checked={selectedValues.has(option.value)}
                            onBlur={controllerField.onBlur}
                            onChange={(event) => {
                              const currentValues = (controllerField.value as string[] | undefined) ?? [];
                              const nextValues = event.target.checked
                                ? [...new Set([...currentValues, option.value])]
                                : currentValues.filter((item) => item !== option.value);
                              controllerField.onChange(nextValues);
                            }}
                            className="h-4 w-4 rounded border-gray-300 text-gray-900 focus-visible:ring-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                          />
                          <span className="text-sm text-gray-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                    {field.description ? <p className="text-sm text-gray-600">{field.description}</p> : null}
                    <ErrorMessage>{fieldState.error?.message}</ErrorMessage>
                  </div>
                );
              }
              default:
                throw new Error(`Unsupported form field kind: ${String((field as { kind: string }).kind)}`);
            }
          }}
        />
      ))}
    </>
  );
}
