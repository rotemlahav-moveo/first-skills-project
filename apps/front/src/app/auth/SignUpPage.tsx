import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ConfigFormFields } from '@shared/form-system';

import { getErrorMessage, signup } from './api';
import { useAuth } from './AuthContext';
import { AuthFormCard } from './components/AuthFormCard';
import { AuthLayout } from './components/AuthLayout';
import { signUpFields, signUpSchema, type SignUpFormValues } from './formConfig';

export function SignUpPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setErrorMessage(null);

    try {
      const authResponse = await signup({
        name: values.fullName,
        email: values.email,
        password: values.password,
      });
      setSession(authResponse);
      navigate('/');
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  });

  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join SnapStyle Fashion to start shopping and saving your favorites."
    >
      <AuthFormCard
        title="Create account"
        description="Fill in your details to get started."
        submitLabel="Create account"
        submittingLabel="Creating account..."
        formId="sign-up-form"
        isSubmitting={isSubmitting}
        errorMessage={errorMessage}
        footerText="Already have an account?"
        footerLinkLabel="Sign in"
        footerLinkTo="/sign-in"
      >
        <form id="sign-up-form" className="grid gap-6" onSubmit={onSubmit} noValidate>
          <ConfigFormFields control={control} fields={signUpFields} isSubmitting={isSubmitting} />
        </form>
      </AuthFormCard>
    </AuthLayout>
  );
}
