
import type {Metadata} from 'next';
import { PT_Sans, Freckle_Face } from 'next/font/google';
import './globals.css';
import { AppProviderWrapper } from '@/components/providers/AppProviderWrapper';

// Configure PT Sans for body
const ptSans = PT_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-pt-sans',
});

// Configure Freckle Face for the site logo text
const freckleFace = Freckle_Face({
  subsets: ['latin'],
  weight: ['400'], // Freckle Face typically only has a 400 weight
  variable: '--font-freckle-face',
});

export const metadata: Metadata = {
  title: 'Dantas & Dantas',
  description: 'E-commerce com sabor do Nordeste e pedidos via WhatsApp.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true} className={`${ptSans.variable} ${freckleFace.variable}`}>
      <head>
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <AppProviderWrapper>
          {children}
        </AppProviderWrapper>
      </body>
    </html>
  );
}
