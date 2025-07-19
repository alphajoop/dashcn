import Link from 'next/link';
import { Metadata } from 'next';
import { LogIn } from 'lucide-react';

import { SignInForm } from '@/components/auth/signin-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Connexion | Dashcn Dashboard',
  description: 'Connectez-vous à votre compte Dashcn Dashboard',
};

export default function SignInPage() {
  return (
    <section className="flex h-screen w-full overflow-hidden">
      <div className="bg-background relative hidden w-1/2 lg:block">
        <div className="absolute inset-0">
          <Image
            src="/images/illustration-signin.png"
            alt="Illustration"
            className="h-full w-full object-cover"
            width={2070}
            height={2070}
          />
        </div>
      </div>

      <div className="bg-background flex w-full items-center justify-center p-8 lg:w-1/2">
        <div className="w-full max-w-md">
          <Card className="border-none shadow-none">
            <CardHeader className="space-y-1">
              <div className="mb-2 flex items-center justify-center">
                <LogIn className="text-primary h-10 w-10" />
              </div>
              <CardTitle className="text-center text-2xl">Connexion</CardTitle>
              <CardDescription className="text-center">
                Entrez vos identifiants pour accéder à votre compte
              </CardDescription>
            </CardHeader>
            <CardContent>
              <SignInForm />
            </CardContent>
            <CardFooter className="text-muted-foreground flex flex-col space-y-4 text-center text-sm">
              <div>
                Vous n&apos;avez pas de compte?{' '}
                <Link
                  href="#"
                  className="text-primary underline-offset-4 hover:underline"
                >
                  Contactez l&apos;administrateur
                </Link>
              </div>
              <div className="text-xs">
                En vous connectant, vous acceptez nos{' '}
                <Link
                  href="#"
                  className="hover:text-primary underline underline-offset-4"
                >
                  Conditions d&apos;utilisation
                </Link>{' '}
                et notre{' '}
                <Link
                  href="#"
                  className="hover:text-primary underline underline-offset-4"
                >
                  Politique de confidentialité
                </Link>
                .
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}
