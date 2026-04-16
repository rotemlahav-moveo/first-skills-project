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
    <Card className="w-full border-gray-300 bg-gray-50 shadow-none">
      <CardHeader className="pb-6">
        <CardTitle className="text-gray-900">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        {children}
        <Button className="h-12 w-full" type="submit">
          {submitLabel}
        </Button>
        <p className="text-center text-sm text-gray-700">
          {footerText}{' '}
          <Link className="text-gray-900 hover:underline" to={footerLinkTo}>
            {footerLinkLabel}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
