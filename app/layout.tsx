import type { Metadata } from "next";
import "./globals.css";
import MotionProvider from "./components/MotionProvider";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import Preloader from "./components/Preloader";
import FilmPlayer from "./components/FilmPlayer";

export const metadata: Metadata = {
  metadataBase: new URL("https://iridescence-ten.vercel.app"),
  title: "Iridescence",
  description: "Maison de production indépendante. Bordeaux. Films, documentaires, clips.",
  openGraph: {
    title: "Iridescence",
    description: "Maison de production indépendante. Bordeaux.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body>
        {/* La vidéo plein écran du projet vit dans FeaturedView (couche de fond permanente). */}
        <Nav />
        <MotionProvider>{children}</MotionProvider>
        <Footer />
        <FilmPlayer />
        <Preloader />
      </body>
    </html>
  );
}
