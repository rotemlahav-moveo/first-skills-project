import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type AuthFormCardProps = {
  title: string;
  description: string;
  submitLabel: string;
  submittingLabel?: string;
  formId: string;
  isSubmitting?: boolean;
  errorMessage?: string | null;
  footerText: string;
  footerLinkLabel: string;
  footerLinkTo: string;
  children: ReactNode;
};

export function AuthFormCard({
  title,
  description,
  submitLabel,
  submittingLabel,
  formId,
  isSubmitting = false,
  errorMessage = null,
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
        {errorMessage ? (
          <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}
        <Button className="h-12 w-full" type="submit" form={formId} disabled={isSubmitting}>
          {isSubmitting ? (submittingLabel ?? 'Submitting...') : submitLabel}
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
