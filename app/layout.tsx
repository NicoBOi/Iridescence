import type { Metadata } from "next";
import "./globals.css";
import MotionProvider from "./components/MotionProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://iridescence-ten.vercel.app"),
  title: "Iridescence · Index",
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
      <body className="min-h-full">
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
