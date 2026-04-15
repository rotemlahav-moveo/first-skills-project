import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type AuthFormCardProps = {
  title: string;
  description: string;
  submitLabel: string;
  footerText: string;
  footerLinkLabel: string;
  footerLinkTo: string;
  children: ReactNode;
};

export function AuthFormCard({
  title,
  description,
  submitLabel,
  footerText,
  footerLinkLabel,
  footerLinkTo,
  children,
}: AuthFormCardProps) {
  return (
    <Card className="auth-card">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="auth-card-content">
        {children}
        <Button className="w-full" type="submit">
          {submitLabel}
        </Button>
        <p className="auth-form-footer">
          {footerText}{' '}
          <Link className="auth-inline-link" to={footerLinkTo}>
            {footerLinkLabel}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
