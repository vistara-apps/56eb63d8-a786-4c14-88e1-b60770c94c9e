import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { ThemeProvider } from './components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'VidSynth - AI Video Creation Platform',
  description: 'Effortless Video Creation with AI and Community Power',
  keywords: ['video creation', 'AI', 'blockchain', 'Base', 'decentralized'],
  authors: [{ name: 'VidSynth Team' }],
  openGraph: {
    title: 'VidSynth - AI Video Creation Platform',
    description: 'Effortless Video Creation with AI and Community Power',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
