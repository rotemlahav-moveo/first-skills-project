import { Link } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthFormCard } from './components/AuthFormCard';
import { AuthLayout } from './components/AuthLayout';

export function SignInPage() {
  return (
    <AuthLayout
      title="Welcome back to your style feed."
      subtitle="Sign in to continue discovering curated looks from your favorite brands."
    >
      <AuthFormCard
        title="Sign in"
        description="Use your email and password to access your account."
        submitLabel="Sign in"
        footerText="New to FirstSkills Fashion?"
        footerLinkLabel="Create an account"
        footerLinkTo="/sign-up"
      >
        <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
          <div className="auth-form-field">
            <Label htmlFor="sign-in-email">Email address</Label>
            <Input id="sign-in-email" placeholder="you@example.com" type="email" required />
          </div>
          <div className="auth-form-field">
            <div className="auth-form-row">
              <Label htmlFor="sign-in-password">Password</Label>
              <Link className="auth-inline-link" to="/forgot-password">
                Forgot password?
              </Link>
            </div>
            <Input id="sign-in-password" placeholder="Enter your password" type="password" required />
          </div>
        </form>
      </AuthFormCard>
    </AuthLayout>
  );
}
