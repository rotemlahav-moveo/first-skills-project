import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { GenericFormInput } from '@shared/form-system';

import { getErrorMessage, useLoginMutation } from '../../redux/authApi/authApi';
import { useAuth } from './AuthContext';
import { AuthFormCard } from './components/AuthFormCard';
import { AuthLayout } from './components/AuthLayout';
import { signInFields } from './formConfig';
import { signInSchema, type SignInFormValues } from './formSchema';
import { ROUTES } from '../routes';

type SignInLocationState = { from?: string };

export function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as SignInLocationState | null)?.from ?? ROUTES.HOME;
  const { setSession } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const {
    control,
    handleSubmit,
    formState: { isSubmitting: isFormSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setErrorMessage(null);

    try {
      const authResponse = await login(values).unwrap();
      setSession(authResponse);
      navigate(from, { replace: true });
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  });
  const isSubmitting = isFormSubmitting || isLoginLoading;

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Welcome back! Sign in to your account to continue."
    >
      <AuthFormCard
        title="Sign in"
        description="Use your email and password to access your account."
        submitLabel="Sign in"
        submittingLabel="Signing in..."
        formId="sign-in-form"
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        footerText="Don't have an account?"
        footerLinkLabel="Create one"
        footerLinkTo="/sign-up"
      >
        <form id="sign-in-form" className="grid gap-6" onSubmit={onSubmit} noValidate>
          <GenericFormInput control={control} fields={signInFields} isSubmitting={isSubmitting} />
        </form>
      </AuthFormCard>
    </AuthLayout>
  );
}
