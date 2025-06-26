import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProviderWrapper } from "@/components/providers/AppProviderWrapper";

// Configure PT Sans for body
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"], // Inter doesn't have a standard 'italic' style, often handled by browser or separate italic font
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Dantas & Dantas",

  description:
    "O melhor da Argentina e Brasil em sua casa! Empanadas congeladas e castanhas de caju. Entregas em Barueri e região.",
  metadataBase: new URL("https://psijaninecorrea.com.br"),
  openGraph: {
    title: "Dantas & Dantas",
    description:
      "O melhor da Argentina e Brasil em sua casa! Empanadas congeladas e castanhas de caju. Entregas em Barueri e região.",
    url: "/",
    siteName: "Dantas & Dantas",
    images: [
      {
        url: "/public/metaImage.png", // coloque a imagem na pasta public/
        width: 600,
        height: 300,
        alt: "Imagem de capa do site da Psicóloga Janine Correa",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dantas & Dantas",
    description:
      "O melhor da Argentina e Brasil em sua casa! Empanadas congeladas e castanhas de caju. Entregas em Barueri e região.",

    images: ["/public/metaImage.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning={true}
      className={`${inter.variable}`}
    >
      <head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dantas & Dantas" />
        <meta
          name="twitter:description"
          content="O melhor da Argentina e Brasil em sua casa! Empanadas congeladas e castanhas de caju. Entregas em Barueri e região."
        />
        <meta name="twitter:image" content="/public/metaImage.png" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <AppProviderWrapper>{children}</AppProviderWrapper>
      </body>
    </html>
  );
}
