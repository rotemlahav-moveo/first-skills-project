import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthFormCard } from './components/AuthFormCard';
import { AuthLayout } from './components/AuthLayout';

export function SignUpPage() {
  return (
    <AuthLayout
      title="Create your fashion profile."
      subtitle="Build your account to save favorites, sizes, and personalized recommendations."
    >
      <AuthFormCard
        title="Create account"
        description="Join in less than a minute."
        submitLabel="Create account"
        footerText="Already have an account?"
        footerLinkLabel="Sign in"
        footerLinkTo="/sign-in"
      >
        <form className="auth-form" onSubmit={(event) => event.preventDefault()}>
          <div className="auth-form-field">
            <Label htmlFor="sign-up-name">Full name</Label>
            <Input id="sign-up-name" placeholder="Alex Morgan" required />
          </div>
          <div className="auth-form-field">
            <Label htmlFor="sign-up-email">Email address</Label>
            <Input id="sign-up-email" placeholder="you@example.com" type="email" required />
          </div>
          <div className="auth-form-field">
            <Label htmlFor="sign-up-password">Password</Label>
            <Input id="sign-up-password" placeholder="Create a secure password" type="password" required />
          </div>
        </form>
      </AuthFormCard>
    </AuthLayout>
  );
}
