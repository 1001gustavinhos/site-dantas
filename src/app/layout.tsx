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
  metadataBase: new URL("https://dantasedantas.com.br"),
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
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Dantas & Dantas" />
        <meta
          property="og:description"
          content="O melhor da Argentina e Brasil em sua casa! Empanadas congeladas e castanhas de caju. Entregas em Barueri e região."
        />
        <meta property="og:url" content="https://seudominio.com.br/" />
        <meta property="og:site_name" content="Dantas & Dantas" />
        <meta property="og:image" content="/metaImage.png" />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="300" />
        <meta
          property="og:image:alt"
          content="Imagem da capa do site Dantas & Dantas"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Dantas & Dantas" />
        <meta
          name="twitter:description"
          content="O melhor da Argentina e Brasil em sua casa! Empanadas congeladas e castanhas de caju. Entregas em Barueri e região."
        />
        <meta name="twitter:image" content="/metaImage.png" />
      </head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <AppProviderWrapper>{children}</AppProviderWrapper>
      </body>
    </html>
  );
}
