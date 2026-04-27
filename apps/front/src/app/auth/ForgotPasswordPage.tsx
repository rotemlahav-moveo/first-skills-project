import { Link } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ConfigFormFields } from '@shared/form-system';

import { AuthFormCard } from './components/AuthFormCard';
import { AuthLayout } from './components/AuthLayout';
import {
  forgotPasswordFields,
  forgotPasswordSchema,
  type ForgotPasswordFormValues,
} from './formConfig';

export function ForgotPasswordPage() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = handleSubmit(async () => {
    // Reset endpoint is not implemented yet.
  });

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email and we will send a password reset link."
    >
      <AuthFormCard
        title="Forgot password"
        description="Enter your account email to reset your password."
        submitLabel="Send reset link"
        formId="forgot-password-form"
        footerText="Remembered your password?"
        footerLinkLabel="Back to sign in"
        footerLinkTo="/sign-in"
        isSubmitting={isSubmitting}
      >
        <form id="forgot-password-form" className="grid gap-6" onSubmit={onSubmit} noValidate>
          <ConfigFormFields
            control={control}
            fields={forgotPasswordFields}
            isSubmitting={isSubmitting}
          />
          <p className="text-sm text-gray-600">
            Need help with account access?{' '}
            <Link className="text-gray-900 hover:underline" to="/sign-up">
              Create a new account instead.
            </Link>
          </p>
        </form>
      </AuthFormCard>
    </AuthLayout>
  );
}
