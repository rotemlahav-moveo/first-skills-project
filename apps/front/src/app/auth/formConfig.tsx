import { Link } from 'react-router-dom';
import { PASSWORD_MIN_LENGTH } from '@shared/auth-domain';
import { FormFieldKind, InputType, type FormFieldConfig } from '@shared/form-system';
import {
  type ForgotPasswordFormValues,
  type SignInFormValues,
  type SignUpFormValues,
} from './formSchema';

export const signInFields: FormFieldConfig<SignInFormValues>[] = [
  {
    kind: FormFieldKind.input,
    name: 'email',
    label: 'Email address',
    inputType: InputType.email,
    autoComplete: 'email',
    placeholder: 'you@example.com',
  },
  {
    kind: FormFieldKind.input,
    name: 'password',
    label: (
      <div className="flex items-center justify-between gap-4">
        <span>Password</span>
        <Link className="text-sm text-gray-700 hover:text-gray-900 hover:underline" to="/forgot-password">
          Forgot password?
        </Link>
      </div>
    ),
    inputType: InputType.password,
    autoComplete: 'current-password',
    placeholder: 'Enter your password',
  },
];

export const signUpFields: FormFieldConfig<SignUpFormValues>[] = [
  {
    kind: FormFieldKind.input,
    name: 'fullName',
    label: 'Full name',
    placeholder: 'Alex Morgan',
    autoComplete: 'name',
  },
  {
    kind: FormFieldKind.input,
    name: 'email',
    label: 'Email address',
    inputType: InputType.email,
    placeholder: 'you@example.com',
    autoComplete: 'email',
  },
  {
    kind: FormFieldKind.input,
    name: 'password',
    label: 'Password',
    inputType: InputType.password,
    placeholder: 'Create a secure password',
    autoComplete: 'new-password',
    description: `Must be at least ${PASSWORD_MIN_LENGTH} characters.`,
  },
];

export const forgotPasswordFields: FormFieldConfig<ForgotPasswordFormValues>[] = [
  {
    kind: FormFieldKind.input,
    name: 'email',
    label: 'Email address',
    inputType: InputType.email,
    autoComplete: 'email',
    placeholder: 'you@example.com',
  },
];
