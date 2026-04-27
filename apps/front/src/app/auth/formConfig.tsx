import { Link } from 'react-router-dom';
import { z } from 'zod';
import { PASSWORD_MIN_LENGTH } from '@shared/auth-domain';
import type { FormFieldConfig } from '@shared/form-system';

// sign in schema - used to validate the form data, sign in form fields
export const signInSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

export type SignInFormValues = z.infer<typeof signInSchema>;

export const signInFields: FormFieldConfig<SignInFormValues>[] = [
  {
    kind: 'input',
    name: 'email',
    label: 'Email address',
    inputType: 'email',
    autoComplete: 'email',
    placeholder: 'you@example.com',
  },
  {
    kind: 'input',
    name: 'password',
    label: (
      <div className="flex items-center justify-between gap-4">
        <span>Password</span>
        <Link className="text-sm text-gray-700 hover:text-gray-900 hover:underline" to="/forgot-password">
          Forgot password?
        </Link>
      </div>
    ),
    inputType: 'password',
    autoComplete: 'current-password',
    placeholder: 'Enter your password',
  },
];

// sign up schema - used to validate the form data, sign up form fields
export const signUpSchema = z.object({
  fullName: z.string().min(1, 'Full name is required.'),
  email: z.string().email('Enter a valid email address.'),
  password: z
    .string()
    .min(PASSWORD_MIN_LENGTH, `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`),
});

export type SignUpFormValues = z.infer<typeof signUpSchema>;

export const signUpFields: FormFieldConfig<SignUpFormValues>[] = [
  {
    kind: 'input',
    name: 'fullName',
    label: 'Full name',
    placeholder: 'Alex Morgan',
    autoComplete: 'name',
  },
  {
    kind: 'input',
    name: 'email',
    label: 'Email address',
    inputType: 'email',
    placeholder: 'you@example.com',
    autoComplete: 'email',
  },
  {
    kind: 'input',
    name: 'password',
    label: 'Password',
    inputType: 'password',
    placeholder: 'Create a secure password',
    autoComplete: 'new-password',
    description: `Must be at least ${PASSWORD_MIN_LENGTH} characters.`,
  },
];

// forgot password schema - used to validate the form data, forgot password form fields
export const forgotPasswordSchema = z.object({
  email: z.string().email('Enter a valid email address.'),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const forgotPasswordFields: FormFieldConfig<ForgotPasswordFormValues>[] = [
  {
    kind: 'input',
    name: 'email',
    label: 'Email address',
    inputType: 'email',
    autoComplete: 'email',
    placeholder: 'you@example.com',
  },
];
