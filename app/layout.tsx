import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Iridescence — Maison de production",
  description: "Maison de production indépendante. Bordeaux. Films, documentaires, clips.",
  openGraph: {
    title: "Iridescence",
    description: "Maison de production indépendante. Bordeaux.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
