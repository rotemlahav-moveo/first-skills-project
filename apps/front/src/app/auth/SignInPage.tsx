import { Link } from 'react-router-dom';
import { type FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getErrorMessage, login } from './api';
import { useAuth } from './AuthContext';
import { AuthFormCard } from './components/AuthFormCard';
import { AuthLayout } from './components/AuthLayout';

export function SignInPage() {
  const navigate = useNavigate();
  const { setSession } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const authResponse = await login({ email, password });
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
        <form id="sign-in-form" className="grid gap-6" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="sign-in-email">Email address</Label>
            <Input
              id="sign-in-email"
              placeholder="you@example.com"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="sign-in-password">Password</Label>
              <Link className="text-sm text-gray-700 hover:text-gray-900 hover:underline" to="/forgot-password">
                Forgot password?
              </Link>
            </div>
            <Input
              id="sign-in-password"
              placeholder="Enter your password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isSubmitting}
            />
          </div>
        </form>
      </AuthFormCard>
    </AuthLayout>
  );
}
