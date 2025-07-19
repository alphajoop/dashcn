import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
const poppins = Poppins({
  variable: '--font-poppins',
  weight: ['400', '500', '700', '800', '900'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dashcn Dashboard',
  description:
    'Gérez facilement vos produits avec Dashcn. Interface rapide, moderne et intuitive.',
  keywords: [
    'Dashcn',
    'gestion de produits',
    'application',
    'commerce',
    'catalogue',
    'dashboard',
  ],
  authors: [{ name: 'Alpha Diop', url: 'https://github/alphajoop' }],
  creator: 'Linekode',
  metadataBase: new URL('https://dashcn.com'),
  openGraph: {
    title: 'Dashcn Dashboard',
    description: 'Optimisez votre inventaire et vos produits avec Dashcn.',
    url: 'https://dashcn.com',
    siteName: 'Dashcn',
    images: [
      {
        url: 'https://dashcn.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: "Aperçu de l'application Dashcn",
      },
    ],
    locale: 'fr_SN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashcn Dashboard',
    description: 'Simplifiez la gestion de votre inventaire avec Dashcn.',
    images: ['https://dashcn.com/og-image.jpg'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="fr" suppressContentEditableWarning>
      <body className={`${poppins.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <main className="flex-1">{children}</main>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
