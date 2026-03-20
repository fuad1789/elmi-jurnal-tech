import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Journal of Sumqait State University - Mathematics and Computer Science',
  description: 'Peer-reviewed academic journal publishing high-quality research in Mathematics and Computer Science at Sumqait State University.',
  keywords: ['academic journal', 'mathematics', 'computer science', 'Sumqait State University', 'research', 'peer-reviewed'],
  authors: [{ name: 'Sumqait State University' }],
  openGraph: {
    title: 'Journal of Sumqait State University',
    description: 'Mathematics and Computer Science',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LanguageProvider defaultLanguage="en">
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}