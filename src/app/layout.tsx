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
  description: "Empanadas Argentinas e Castanhas de Caju do Marcelo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning={true}
      className={`${inter.variable}`}
    >
      <head></head>
      <body className="font-body antialiased" suppressHydrationWarning={true}>
        <AppProviderWrapper>{children}</AppProviderWrapper>
      </body>
    </html>
  );
}
