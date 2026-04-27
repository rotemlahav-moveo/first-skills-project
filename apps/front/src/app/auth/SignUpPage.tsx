import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PASSWORD_MIN_LENGTH } from '../../../../../libs/shared/auth-domain/src';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getErrorMessage, signup } from './api';
import { useAuth } from './AuthContext';
import { AuthFormCard } from './components/AuthFormCard';
import { AuthLayout } from './components/AuthLayout';

export function SignUpPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const authResponse = await signup({ name: fullName, email, password });
      setSession(authResponse);
      navigate('/');
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }

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
        <form id="sign-up-form" className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="sign-up-name">Full name</Label>
            <Input
              id="sign-up-name"
              placeholder="Alex Morgan"
              required
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sign-up-email">Email address</Label>
            <Input
              id="sign-up-email"
              placeholder="you@example.com"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sign-up-password">Password</Label>
            <Input
              id="sign-up-password"
              placeholder="Create a secure password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isSubmitting}
            />
            <p className="text-sm text-gray-600">
              Must be at least {PASSWORD_MIN_LENGTH} characters.
            </p>
          </div>
        </form>
      </AuthFormCard>
    </AuthLayout>
  );
}
