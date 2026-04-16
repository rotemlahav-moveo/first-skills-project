import { Link } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthFormCard } from './components/AuthFormCard';
import { AuthLayout } from './components/AuthLayout';

export function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Reset and get back to shopping."
      subtitle="We will send a secure reset link to your inbox."
    >
      <AuthFormCard
        title="Forgot password"
        description="Enter your account email to reset your password."
        submitLabel="Send reset link"
        footerText="Remembered your password?"
        footerLinkLabel="Back to sign in"
        footerLinkTo="/sign-in"
      >
        <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
          <div className="auth-form-field">
            <Label htmlFor="reset-email">Email address</Label>
            <Input id="reset-email" placeholder="you@example.com" type="email" required />
          </div>
          <p className="auth-reset-help">
            Need help with account access? <Link to="/sign-up">Create a new account instead.</Link>
          </p>
        </form>
      </AuthFormCard>
    </AuthLayout>
  );
}
