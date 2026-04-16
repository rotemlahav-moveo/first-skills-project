import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AuthFormCard } from './components/AuthFormCard';
import { AuthLayout } from './components/AuthLayout';

export function SignUpPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Join FirstSkills Fashion to start shopping and saving your favorites."
    >
      <AuthFormCard
        title="Create account"
        description="Fill in your details to get started."
        submitLabel="Create account"
        footerText="Already have an account?"
        footerLinkLabel="Sign in"
        footerLinkTo="/sign-in"
      >
        <form className="grid gap-6" onSubmit={(event) => event.preventDefault()}>
          <div className="grid gap-2">
            <Label htmlFor="sign-up-name">Full name</Label>
            <Input id="sign-up-name" placeholder="Alex Morgan" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sign-up-email">Email address</Label>
            <Input id="sign-up-email" placeholder="you@example.com" type="email" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="sign-up-password">Password</Label>
            <Input id="sign-up-password" placeholder="Create a secure password" type="password" required />
            <p className="text-sm text-gray-600">Must be at least 8 characters.</p>
          </div>
        </form>
      </AuthFormCard>
    </AuthLayout>
  );
}
