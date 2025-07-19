import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-background flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="relative h-64 w-full">
          <Image
            src="/images/illustration-404.png"
            alt="Page non trouvée"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
          <h2 className="text-2xl font-semibold">Page non trouvée</h2>
          <p className="text-muted-foreground">
            Désolé, nous n&apos;avons pas trouvé la page que vous recherchez.
          </p>
        </div>
        <Button asChild className="mt-4">
          <Link href="/" className="inline-flex items-center gap-2">
            <ArrowLeft className="h-4 w-4" />
            Retour à l&apos;accueil
          </Link>
        </Button>
      </div>
    </div>
  );
}
