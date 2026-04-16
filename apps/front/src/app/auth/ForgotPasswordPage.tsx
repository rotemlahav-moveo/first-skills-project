import { Link } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthFormCard } from './components/AuthFormCard';
import { AuthLayout } from './components/AuthLayout';

export function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email and we will send a password reset link."
    >
      <AuthFormCard
        title="Forgot password"
        description="Enter your account email to reset your password."
        submitLabel="Send reset link"
        footerText="Remembered your password?"
        footerLinkLabel="Back to sign in"
        footerLinkTo="/sign-in"
      >
        <form className="grid gap-6" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-2">
            <Label htmlFor="reset-email">Email address</Label>
            <Input id="reset-email" placeholder="you@example.com" type="email" required />
          </div>
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
