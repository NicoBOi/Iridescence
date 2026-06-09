import type { Metadata } from "next";
import "./globals.css";
import MotionProvider from "./components/MotionProvider";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import ScrollProgress from "./components/ScrollProgress";
import MagneticCursor from "./components/MagneticCursor";

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
        <MagneticCursor />
        <ScrollProgress />
        <Nav />
        <MotionProvider>{children}</MotionProvider>
        <Footer />
      </body>
    </html>
  );
}
