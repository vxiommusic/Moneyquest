import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { Header } from '@/components/Header';

export const metadata: Metadata = {
  title: 'MoneyQuest',
  description: 'Геймифицируйте свою жизнь и побеждайте свои задачи.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <Header />
        <main className="p-2 sm:p-4 lg:p-6">
          {children}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
