import { Link } from 'react-router-dom';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthFormCard } from './components/AuthFormCard';
import { AuthLayout } from './components/AuthLayout';

export function SignInPage() {
  return (
    <AuthLayout
      title="Sign In"
      subtitle="Welcome back! Sign in to your account to continue."
    >
      <AuthFormCard
        title="Sign in"
        description="Use your email and password to access your account."
        submitLabel="Sign in"
        footerText="Don't have an account?"
        footerLinkLabel="Create one"
        footerLinkTo="/sign-up"
      >
        <form className="grid gap-6" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-2">
            <Label htmlFor="sign-in-email">Email address</Label>
            <Input id="sign-in-email" placeholder="you@example.com" type="email" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="sign-in-password">Password</Label>
              <Link className="text-sm text-gray-700 hover:text-gray-900 hover:underline" to="/forgot-password">
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
