import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { QuickExitButton } from '@/components/quick-exit-button';
import './globals.css';

export const metadata: Metadata = {
  title: 'SafeHaven',
  description: 'Discreet support for survivors of domestic violence',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased h-full bg-background text-foreground">
        {children}
        <QuickExitButton />
        <Toaster />
      </body>
    </html>
  );
}
